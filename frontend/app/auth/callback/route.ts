import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Handles the link from Supabase's confirmation email.
 *
 * Behavior: confirm the email (this DOES create a session via
 * exchangeCodeForSession), then immediately sign that session out again,
 * and send the user to /login with their email pre-filled so they
 * type their password themselves. We never auto-login from this link.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/chat"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const email = data?.user?.email ?? ""

      // This is a password-reset flow, not signup confirmation.
      // Keep the session alive so /reset-password can use it.
      if (next === "/reset-password") {
        return NextResponse.redirect(`${origin}${next}`)
      }

      // Signup/email confirmation: sign the auto-created session back out.
      await supabase.auth.signOut()

      const loginUrl = new URL("/login", origin)
      if (email) loginUrl.searchParams.set("email", email)
      loginUrl.searchParams.set("confirmed", "1")
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
