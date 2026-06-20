import Link from "next/link"
import { Logo } from "@/components/Logo"

const HERO_IMG = "https://images.unsplash.com/photo-1560707854-fb9a10eeaace?w=1600&q=90"
const BREAK_IMG = "https://images.unsplash.com/photo-1752240879764-97bb683bf0d5?w=1400&q=85"

function ArrowRight({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Check({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 l4 4 l10 -10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Chat({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M4 6 a3 3 0 0 1 3 -3 h10 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 H9 l-5 4 v-4 a3 3 0 0 1 0 -10 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
}
function Move({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="2.2"/><path d="M12 8 V15 M12 11 L7 13 M12 11 L17 13 M12 15 L9 21 M12 15 L15 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
}
function Pill({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="3" y="9" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="2.2" transform="rotate(45 12 12)"/><path d="M12 8 L16 12" stroke="currentColor" strokeWidth="2.2"/></svg>
}
function Shield({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2 L4 5 v6 c0 5 3.5 9 8 11 4.5 -2 8 -6 8 -11 V5 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M9 12 l2 2 l4 -4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Coins({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><ellipse cx="9" cy="8" rx="6" ry="3" stroke="currentColor" strokeWidth="2.2"/><path d="M3 8 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="2.2"/><ellipse cx="15" cy="14" rx="6" ry="3" stroke="currentColor" strokeWidth="2.2"/><path d="M9 14 v4 c0 1.7 2.7 3 6 3 s6 -1.3 6 -3 v-4" stroke="currentColor" strokeWidth="2.2"/></svg>
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
      <header className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2">Log in</Link>
            <Link href="/signup" className="text-sm font-semibold text-forest-900 bg-gradient-to-br from-cream-300 to-cream-500 hover:brightness-105 px-4 py-2.5 rounded-xl transition-all shadow-brass">Get started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center 25%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(7,15,11,0.96) 0%, rgba(10,23,17,0.85) 45%, rgba(10,23,17,0.4) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,75,0.4) 50%, transparent)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-cream-400/30 text-cream-200 text-xs font-medium mb-7 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cream-400" style={{ boxShadow: "0 0 8px rgb(var(--cream-400))" }} />
              Meet Lami, built on HelpMum
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] tracking-tight text-cream-50">
              The friend every mother{" "}
              <span className="italic" style={{ color: "rgb(var(--cream-400))" }}>deserves.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-cream-200/80 leading-relaxed font-light">
              Lami is your AI companion through pregnancy and motherhood. She chats, she checks your medicine, she guides your meals and exercises, and when it matters most, she gets you help fast. Built for Nigerian mothers.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-gradient-to-br from-cream-300 to-cream-500 hover:brightness-105 text-forest-900 font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-brass">
                Meet Lami <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-cream-100 font-semibold px-6 py-3.5 rounded-2xl transition-colors">
                I already have an account
              </Link>
            </div>
            <div className="mt-11 flex items-center gap-7">
              <div><p className="text-2xl font-semibold text-cream-50 font-serif">24/7</p><p className="text-xs text-cream-200/50 mt-0.5 tracking-wide uppercase">Always here</p></div>
              <div className="w-px h-10" style={{ background: "linear-gradient(180deg, transparent, rgba(201,162,75,0.4), transparent)" }} />
              <div><p className="text-2xl font-semibold text-cream-50 font-serif">1 tap</p><p className="text-xs text-cream-200/50 mt-0.5 tracking-wide uppercase">Emergency help</p></div>
              <div className="w-px h-10" style={{ background: "linear-gradient(180deg, transparent, rgba(201,162,75,0.4), transparent)" }} />
              <div><p className="text-2xl font-semibold text-cream-50 font-serif">40</p><p className="text-xs text-cream-200/50 mt-0.5 tracking-wide uppercase">Weeks guided</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-800 border-y border-cream-400/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-9 text-center">
          <p className="text-xs sm:text-sm text-cream-300/70 uppercase tracking-widest font-medium">Built on HelpMum open-source innovations</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <p className="text-base font-serif font-semibold text-cream-100">MamaBot-Llama</p>
            <span className="w-1 h-1 rounded-full bg-cream-400/50" />
            <p className="text-base font-serif font-semibold text-cream-100">9ja Translators</p>
            <span className="w-1 h-1 rounded-full bg-cream-400/50" />
            <p className="text-base font-serif font-semibold text-cream-100">Vax-Llama</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cream-500 mb-3">What she does</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">Everything a mother needs, in one warm place.</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">Not a cold medical app. A companion who feels like your sharpest, funniest friend, who happens to be a nurse.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6 hover:shadow-luxe hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-forest-800 text-cream-400 flex items-center justify-center mb-4 shadow-emerald"><Icon className="w-6 h-6" /></div>
                <h3 className="font-serif font-semibold text-lg text-stone-900">{title}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url('${BREAK_IMG}')`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,15,11,0.5) 0%, rgba(7,15,11,0.88) 100%)" }} />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-cream-50 font-semibold leading-snug max-w-xl mx-auto">
              Lami does not replace your doctor. She stands beside you, every single day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["Calls for help in seconds", "Conservative and careful", "Knows you by name"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-cream-100/90 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgb(var(--cream-300)), rgb(var(--cream-500)))" }}><Check className="w-3 h-3 text-forest-900" /></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 leading-tight">She is waiting to meet you.</h2>
          <p className="mt-5 text-lg text-stone-600">Free to begin. No card needed. Just a friend, whenever you need her.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-800 text-cream-50 font-semibold px-7 py-4 rounded-2xl text-base shadow-emerald transition-colors">
              Create your free account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-forest-800 border-t border-cream-400/15 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={28} light />
          <p className="text-xs text-cream-300/60 text-center sm:text-right">Built for the HelpMum CareCode Hackathon 2.0. Made with care in Lagos, Nigeria.</p>
        </div>
      </footer>
    </div>
  )
}
