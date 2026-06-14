"use client"

export function LandingHeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 480" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCEADE"/>
          <stop offset="100%" stopColor="#FBF5EB"/>
        </linearGradient>
        <radialGradient id="lh-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD08A"/>
          <stop offset="55%" stopColor="#F2933A" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#F2933A" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="lh-hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C97A"/>
          <stop offset="100%" stopColor="#7DAF4A"/>
        </linearGradient>
        <linearGradient id="lh-hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4E8C34"/>
          <stop offset="100%" stopColor="#2E6020"/>
        </linearGradient>
        <linearGradient id="lh-wrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E06828"/>
          <stop offset="100%" stopColor="#B84E18"/>
        </linearGradient>
        <linearGradient id="lh-babywrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5C48A"/>
          <stop offset="100%" stopColor="#E8A55A"/>
        </linearGradient>
      </defs>
      <rect width="560" height="480" fill="url(#lh-sky)"/>
      <circle cx="390" cy="200" r="160" fill="url(#lh-sun)"/>
      <circle cx="390" cy="200" r="54" fill="#FFE0A0" opacity="0.95"/>
      <circle cx="390" cy="200" r="38" fill="#FFD070"/>
      <path d="M160 130 Q167 124 174 130" stroke="#8B6040" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M180 118 Q188 112 196 118" stroke="#8B6040" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M130 148 Q136 143 142 148" stroke="#8B6040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M0 360 Q100 300 220 330 Q340 358 460 310 Q520 290 560 315 L560 480 L0 480 Z" fill="url(#lh-hill1)"/>
      <path d="M0 400 Q80 365 200 385 Q320 405 440 370 Q510 352 560 375 L560 480 L0 480 Z" fill="url(#lh-hill2)"/>
      <ellipse cx="252" cy="228" rx="26" ry="30" fill="url(#lh-babywrap)"/>
      <circle cx="252" cy="200" r="22" fill="#7A3518"/>
      <circle cx="246" cy="200" r="2" fill="#3A1A08" opacity="0.7"/>
      <circle cx="258" cy="200" r="2" fill="#3A1A08" opacity="0.7"/>
      <ellipse cx="252" cy="205" rx="2" ry="1.2" fill="#5A2810" opacity="0.5"/>
      <path d="M228 235 Q252 230 276 238" stroke="#C87A38" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M226 248 Q252 242 278 250" stroke="#C87A38" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M228 261 Q252 255 276 263" stroke="#C87A38" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M218 270 Q200 310 196 390 L290 390 Q286 310 268 270 Z" fill="url(#lh-wrap)"/>
      <path d="M202 310 Q244 305 284 312" stroke="#F5B080" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <path d="M200 335 Q244 330 286 338" stroke="#F5B080" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <path d="M200 360 Q244 355 286 363" stroke="#F5B080" strokeWidth="1.2" fill="none" opacity="0.35"/>
      <path d="M228 322 L233 328 L228 334 L223 328 Z" fill="#F5B080" opacity="0.55"/>
      <path d="M244 322 L249 328 L244 334 L239 328 Z" fill="#F5B080" opacity="0.55"/>
      <path d="M260 322 L265 328 L260 334 L255 328 Z" fill="#F5B080" opacity="0.55"/>
      <path d="M218 275 Q200 300 202 340 Q204 356 216 358 Q226 356 228 340 L228 280 Z" fill="#6A2E14"/>
      <rect x="234" y="256" width="18" height="24" rx="4" fill="#6A2E14"/>
      <ellipse cx="243" cy="230" rx="28" ry="32" fill="#7A3518"/>
      <ellipse cx="235" cy="228" rx="2" ry="2.5" fill="#2A0E04"/>
      <ellipse cx="251" cy="228" rx="2" ry="2.5" fill="#2A0E04"/>
      <path d="M235 240 Q243 245 251 240" stroke="#4A1A08" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M241 233 Q243 237 245 233" stroke="#4A1A08" strokeWidth="1" fill="none"/>
      <ellipse cx="216" cy="232" rx="4" ry="5" fill="#6A2E14"/>
      <circle cx="216" cy="238" r="2.5" fill="#F5C840"/>
      <path d="M215 215 Q215 185 243 175 Q271 185 271 215 Q268 205 243 202 Q218 205 215 215 Z" fill="#2E6020"/>
      <path d="M218 210 Q215 180 225 160 Q235 138 243 130 Q251 138 261 160 Q271 180 268 210 Z" fill="#3A7828"/>
      <path d="M215 215 Q200 205 198 190 Q200 175 215 178 Q218 185 218 210 Z" fill="#2E6020"/>
      <path d="M271 215 Q286 205 288 190 Q286 175 271 178 Q268 185 268 210 Z" fill="#2E6020"/>
      <path d="M225 175 Q243 162 261 175" stroke="#6AAA50" strokeWidth="2.5" fill="none" opacity="0.6"/>
      <path d="M220 195 Q243 185 266 195" stroke="#4A8838" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M237 132 Q243 120 249 132 Q246 136 243 140 Q240 136 237 132 Z" fill="#4A8838"/>
      <path d="M180 392 Q183 382 186 392" stroke="#2E6020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M290 392 Q293 382 296 392" stroke="#2E6020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M305 392 Q309 380 313 392" stroke="#2E6020" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="120" cy="180" r="3" fill="#FFD08A" opacity="0.7"/>
      <circle cx="480" cy="150" r="4" fill="#FFD08A" opacity="0.65"/>
      <circle cx="80" cy="290" r="2" fill="#FFD08A" opacity="0.55"/>
      <circle cx="500" cy="310" r="3" fill="#FFD08A" opacity="0.6"/>
      <circle cx="340" cy="120" r="2" fill="#FFD08A" opacity="0.5"/>
      <circle cx="470" cy="420" r="2.5" fill="#FFD08A" opacity="0.5"/>
    </svg>
  )
}
