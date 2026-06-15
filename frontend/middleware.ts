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

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p))
  const isAuthPage = AUTH_PAGES.includes(path)
  const isOnboarding = path.startsWith("/onboarding")

  // Not logged in trying to reach protected page or onboarding
  if ((isProtected || isOnboarding) && !user) {
    const u = request.nextUrl.clone()
    u.pathname = "/login"
    u.searchParams.set("next", path)
    return NextResponse.redirect(u)
  }

  // Logged in on auth page - go straight to chat
  if (isAuthPage && user) {
    const u = request.nextUrl.clone()
    u.pathname = "/chat"
    return NextResponse.redirect(u)
  }

  // Logged in but no profile completed - force onboarding
  if (isProtected && user) {
    const onboardedCookie = request.cookies.get("lami-onboarded")
    if (!onboardedCookie || onboardedCookie.value !== "1") {
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
