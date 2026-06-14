import Link from "next/link"
import { Logo } from "@/components/svg/Logo"

function ArrowRight({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function Check({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 l4 4 l10 -10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function HeartShield({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2 L4 5 v6 c0 5 3.5 9 8 11 4.5 -2 8 -6 8 -11 V5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 13 c0 -1.5 1 -2.5 2.5 -2.5 c1 0 1.5 0.5 2.5 1.5 c1 -1 1.5 -1.5 2.5 -1.5 c1.5 0 2.5 1 2.5 2.5 c0 2.5 -5 5 -5 5 s-5 -2.5 -5 -5 Z" fill="currentColor" transform="translate(-2 -2)"/></svg>
}

function Leaf({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 22 V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 12 C8 12 6 9 6 6 C9 6 12 8 12 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 14 C16 14 18 11 18 8 C15 8 12 10 12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6 22 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}

function Coins({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><ellipse cx="9" cy="8" rx="6" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="15" cy="14" rx="6" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 14 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="1.5"/></svg>
}

function Chat({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M3 7 a4 4 0 0 1 4 -4 h7 a4 4 0 0 1 4 4 v3 a4 4 0 0 1 -4 4 h-5 l-6 4 v-4 a4 4 0 0 1 -4 -4 z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
}

function Lock({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 11 v-3 a4 4 0 1 1 8 0 v3" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
}

function Cal({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 10 H21 M8 3 V7 M16 3 V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/></svg>
}

const features = [
  { icon: HeartShield, title: "Symptom triage you can trust", body: "MamaBot tells you clearly: rest at home, see a clinic this week, or go to the hospital now. No guessing." },
  { icon: Leaf, title: "Nutrition rooted in your kitchen", body: "Ugu, ewedu, beans, akara, moringa. Real Nigerian foods with stage-aware advice for pregnancy and breastfeeding." },
  { icon: Coins, title: "Meal plans that fit your budget", body: "Tell us what you spend each week and we will draft a seven-day plan with local foods and full nutrient targets." },
  { icon: Chat, title: "Talk in your language", body: "Speak Yoruba, Igbo, or Hausa. Hear the answer in the same language. HelpMum 9ja translators handle the rest." },
  { icon: Cal, title: "Week by week, side by side", body: "Forty weeks of pregnancy and twelve weeks postpartum, each with what to expect, what to eat, and what to watch for." },
  { icon: Lock, title: "Private and respectful", body: "Your photos and conversations stay with you. We never sell health data or share without your consent." },
]

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-cream-50 text-stone-800">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-cream-50/85 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">Log in</Link>
            <Link href="/signup" className="text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 px-4 py-2.5 rounded-xl transition-colors">Get started</Link>
          </div>
        </div>
      </header>

      {/* HERO - full bleed photo */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1600&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(28,57,32,0.92) 0%, rgba(28,57,32,0.75) 45%, rgba(28,57,32,0.3) 100%)" }}/>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-pulse-soft"/>
              Powered by HelpMum MamaBot
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
              A companion for{" "}
              <span className="text-terracotta-300">every step</span>{" "}
              of motherhood.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed">
              From your first kick to your first night home with baby. Trusted answers, meal plans for your budget, and a gentle guide through every week. Built for Nigerian mothers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-warm">
                Begin your journey <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors">
                I already have an account
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div><p className="text-2xl font-bold text-white font-display">40</p><p className="text-xs text-white/55 mt-0.5">Weeks of guidance</p></div>
              <div className="w-px h-10 bg-white/20"/>
              <div><p className="text-2xl font-bold text-white font-display">9ja</p><p className="text-xs text-white/55 mt-0.5">Voice in Yoruba</p></div>
              <div className="w-px h-10 bg-white/20"/>
              <div><p className="text-2xl font-bold text-white font-display">100%</p><p className="text-xs text-white/55 mt-0.5">Red flag detection</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-center">
          <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-wide font-medium">Built on HelpMum open-source innovations</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <p className="text-base font-display font-semibold text-stone-700">MamaBot-Llama</p>
            <span className="w-1 h-1 rounded-full bg-stone-300"/>
            <p className="text-base font-display font-semibold text-stone-700">9ja Translators</p>
            <span className="w-1 h-1 rounded-full bg-stone-300"/>
            <p className="text-base font-display font-semibold text-stone-700">Vax-Llama</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">Care that meets you where you are.</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">Not a sterile medical chatbot. A warm companion tuned to your reality, your language, and your kitchen.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6 hover:shadow-warm transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6"/>
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">{title}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo break section */}
      <section className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560328055-e938bb2ed50a?w=1400&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,57,32,0.5) 0%, rgba(28,57,32,0.75) 100%)" }}/>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div>
            <p className="font-display text-2xl sm:text-3xl text-white font-bold leading-snug max-w-xl mx-auto">
              We do not replace your doctor. We stand next to you, between visits.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["Conservative by design", "Hard-coded red flags", "WHO-aligned content"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/85 text-sm">
                  <div className="w-5 h-5 rounded-full bg-terracotta-500 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white"/>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">Your next chapter starts here.</h2>
          <p className="mt-5 text-lg text-stone-600">Free to begin. No card needed. Just answers, week after week.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-7 py-4 rounded-2xl text-base shadow-warm transition-colors">
              Create your free account <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={28}/>
          <p className="text-xs text-stone-500 text-center sm:text-right">
            Built for the HelpMum CareCode Hackathon 2.0. Made with care in Lagos, Nigeria.
          </p>
        </div>
      </footer>
    </div>
  )
}
