import Link from "next/link"
import { Logo } from "@/components/Logo"

const HERO_IMG = "https://images.unsplash.com/photo-1560707854-fb9a10eeaace?w=1600&q=90"
const BREAK_IMG = "https://images.unsplash.com/photo-1752240879764-97bb683bf0d5?w=1400&q=85"

function ArrowRight({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Check({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 l4 4 l10 -10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Chat({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M4 6 a3 3 0 0 1 3 -3 h10 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 H9 l-5 4 v-4 a3 3 0 0 1 0 -10 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
}
function Move({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8 V15 M12 11 L7 13 M12 11 L17 13 M12 15 L9 21 M12 15 L15 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function Pill({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="3" y="9" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)"/><path d="M12 8 L16 12" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function Shield({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2 L4 5 v6 c0 5 3.5 9 8 11 4.5 -2 8 -6 8 -11 V5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12 l2 2 l4 -4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Coins({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><ellipse cx="9" cy="8" rx="6" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="15" cy="14" rx="6" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 14 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="1.5"/></svg>
}

const features = [
  { icon: Chat, title: "Lami, your friend who knows medicine", body: "Chat anytime. She jokes with you, worries with you, and gives real answers. She knows your week and your baby." },
  { icon: Shield, title: "Emergency help in one tap", body: "When something is wrong, the SOS button calls your emergency contact and sends them a message about how you feel." },
  { icon: Move, title: "Gentle exercises, step by step", body: "Safe stretches and breathing for every stage, with simple animated guides you can follow at home." },
  { icon: Pill, title: "Check any medicine", body: "Type the drug name, tell Lami how you take it, and find out if it is safe in pregnancy and breastfeeding." },
  { icon: Coins, title: "Meal plans for your budget", body: "Real Nigerian foods, real market prices. A full week of meals that fit what you can actually spend." },
  { icon: Check, title: "Week by week, never alone", body: "Forty weeks of pregnancy and twelve weeks after, each with what to expect and a word of encouragement." },
]

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-cream-50 text-stone-800">
      <header className="sticky top-0 z-50 bg-cream-50/85 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">Log in</Link>
            <Link href="/signup" className="text-sm font-semibold text-white bg-forest-600 hover:bg-forest-700 px-4 py-2.5 rounded-xl transition-colors">Get started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center 25%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(21,52,30,0.94) 0%, rgba(21,52,30,0.78) 45%, rgba(21,52,30,0.35) 100%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-300 animate-pulse-soft" />
              Meet Lami, built on HelpMum
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
              The friend every mother{" "}
              <span className="text-sage-300">deserves.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
              Lami is your AI companion through pregnancy and motherhood. She chats, she checks your medicine, she guides your meals and exercises, and when it matters most, she gets you help fast. Built for Nigerian mothers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-forest-500 hover:bg-forest-400 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors shadow-warm">
                Meet Lami <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors">
                I already have an account
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div><p className="text-2xl font-bold text-white font-display">24/7</p><p className="text-xs text-white/55 mt-0.5">Always here</p></div>
              <div className="w-px h-10 bg-white/20" />
              <div><p className="text-2xl font-bold text-white font-display">1 tap</p><p className="text-xs text-white/55 mt-0.5">Emergency help</p></div>
              <div className="w-px h-10 bg-white/20" />
              <div><p className="text-2xl font-bold text-white font-display">40</p><p className="text-xs text-white/55 mt-0.5">Weeks guided</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-center">
          <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-wide font-medium">Built on HelpMum open-source innovations</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <p className="text-base font-display font-semibold text-forest-700">MamaBot-Llama</p>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <p className="text-base font-display font-semibold text-forest-700">9ja Translators</p>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <p className="text-base font-display font-semibold text-forest-700">Vax-Llama</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">Everything a mother needs, in one warm place.</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">Not a cold medical app. A companion who feels like your sharpest, funniest friend, who happens to be a nurse.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6 hover:shadow-warm transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center mb-4"><Icon className="w-6 h-6" /></div>
                <h3 className="font-display font-bold text-lg text-stone-900">{title}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${BREAK_IMG}')`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21,52,30,0.55) 0%, rgba(21,52,30,0.8) 100%)" }} />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div>
            <p className="font-display text-2xl sm:text-3xl text-white font-bold leading-snug max-w-xl mx-auto">
              Lami does not replace your doctor. She stands beside you, every single day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["Calls for help in seconds", "Conservative and careful", "Knows you by name"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                  <div className="w-5 h-5 rounded-full bg-forest-500 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" /></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">She is waiting to meet you.</h2>
          <p className="mt-5 text-lg text-stone-600">Free to begin. No card needed. Just a friend, whenever you need her.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-semibold px-7 py-4 rounded-2xl text-base shadow-warm transition-colors">
              Create your free account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-stone-50 border-t border-stone-100 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={28} />
          <p className="text-xs text-stone-500 text-center sm:text-right">Built for the HelpMum CareCode Hackathon 2.0. Made with care in Lagos, Nigeria.</p>
        </div>
      </footer>
    </div>
  )
}
