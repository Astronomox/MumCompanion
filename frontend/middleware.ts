import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const PROTECTED_PREFIXES = ["/chat", "/journey", "/move", "/scan", "/profile", "/emergency"]
const AUTH_PAGES = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url.includes("placeholder")) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // CRITICAL: always re-validate session, never trust cache on protected/auth pages
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p))
  const isAuthPage = AUTH_PAGES.includes(path)
  const isOnboarding = path.startsWith("/onboarding")

  // Force no-cache on every protected route so back-swipe never shows stale authenticated content
  if (isProtected || isOnboarding) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
  }

  // Not logged in trying to reach protected page or onboarding -> login
  if ((isProtected || isOnboarding) && !user) {
    const u = request.nextUrl.clone()
    u.pathname = "/login"
    u.searchParams.set("next", path)
    return NextResponse.redirect(u)
  }

  // Logged in on auth page -> go straight to chat
  if (isAuthPage && user) {
    const u = request.nextUrl.clone()
    u.pathname = "/chat"
    return NextResponse.redirect(u)
  }

  // Logged in and hitting a protected page -> check REAL profile in Supabase, not a cookie
  if (isProtected && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name, week")
      .eq("id", user.id)
      .maybeSingle()

    const hasCompletedProfile = !!(profile?.name && profile?.week)

    if (!hasCompletedProfile) {
      const u = request.nextUrl.clone()
      u.pathname = "/onboarding"
      return NextResponse.redirect(u)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
