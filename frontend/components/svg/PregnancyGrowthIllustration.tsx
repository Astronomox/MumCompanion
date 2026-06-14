"use client"

export function PregnancyGrowthIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 640" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pg-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDF5EB"/>
          <stop offset="100%" stopColor="#FAE8D0"/>
        </linearGradient>
        <radialGradient id="pg-sun" cx="65%" cy="22%" r="38%">
          <stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.9"/>
          <stop offset="55%" stopColor="#F2A050" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#F2A050" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pg-belly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE8C0" stopOpacity="0.9"/>
          <stop offset="70%" stopColor="#FFD898" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#FFD898" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="pg-dress" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D85220"/>
          <stop offset="100%" stopColor="#9E3010"/>
        </linearGradient>
        <linearGradient id="pg-gele" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A7828"/>
          <stop offset="100%" stopColor="#1E4814"/>
        </linearGradient>
        <linearGradient id="pg-plant" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#4A8830"/>
          <stop offset="100%" stopColor="#88C858"/>
        </linearGradient>
      </defs>
      <rect width="480" height="640" fill="url(#pg-bg)"/>
      <circle cx="390" cy="120" r="180" fill="url(#pg-sun)"/>
      <circle cx="390" cy="120" r="80" stroke="#F2A050" strokeWidth="1" fill="none" opacity="0.3"/>
      <circle cx="390" cy="120" r="110" stroke="#F2A050" strokeWidth="0.8" fill="none" opacity="0.2"/>
      <circle cx="390" cy="120" r="140" stroke="#F2A050" strokeWidth="0.5" fill="none" opacity="0.15"/>
      <g opacity="0.12" stroke="#D85220" strokeWidth="0.8" fill="none">
        <path d="M60 80 L80 100 L60 120 L40 100 Z"/>
        <path d="M100 80 L120 100 L100 120 L80 100 Z"/>
        <path d="M60 160 L80 180 L60 200 L40 180 Z"/>
        <path d="M420 300 L440 320 L420 340 L400 320 Z"/>
        <path d="M420 360 L440 380 L420 400 L400 380 Z"/>
      </g>
      <path d="M148 560 Q148 480 144 420 Q140 380 136 340" stroke="url(#pg-plant)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M144 430 Q120 415 112 398 Q120 395 134 412 Z" fill="#5AAA38" opacity="0.85"/>
      <path d="M144 430 Q168 415 176 398 Q168 395 154 412 Z" fill="#6AC048" opacity="0.85"/>
      <path d="M140 470 Q115 455 107 436 Q116 434 130 452 Z" fill="#5AAA38" opacity="0.8"/>
      <path d="M140 470 Q165 455 173 436 Q164 434 150 452 Z" fill="#6AC048" opacity="0.8"/>
      <path d="M138 510 Q116 497 110 480 Q118 477 132 492 Z" fill="#4A9A28" opacity="0.75"/>
      <path d="M138 510 Q160 497 166 480 Q158 477 144 492 Z" fill="#5AAA38" opacity="0.75"/>
      <path d="M75 560 Q76 510 74 468 Q72 440 70 415" stroke="url(#pg-plant)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M73 445 Q55 432 50 420 Q57 418 68 432 Z" fill="#5AAA38" opacity="0.8"/>
      <path d="M73 445 Q91 432 96 420 Q89 418 78 432 Z" fill="#6AC048" opacity="0.8"/>
      <path d="M72 478 Q55 467 50 455 Q57 453 68 465 Z" fill="#4A9A28" opacity="0.75"/>
      <path d="M72 478 Q89 467 94 455 Q87 453 76 465 Z" fill="#5AAA38" opacity="0.75"/>
      <path d="M370 560 Q370 510 372 466 Q374 438 376 408" stroke="url(#pg-plant)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M373 438 Q352 424 347 410 Q355 408 368 422 Z" fill="#5AAA38" opacity="0.8"/>
      <path d="M373 438 Q394 424 399 410 Q391 408 378 422 Z" fill="#6AC048" opacity="0.8"/>
      <path d="M372 475 Q352 462 347 448 Q355 446 368 460 Z" fill="#4A9A28" opacity="0.75"/>
      <path d="M372 475 Q392 462 397 448 Q389 446 376 460 Z" fill="#5AAA38" opacity="0.75"/>
      <path d="M372 512 Q354 500 350 488 Q357 486 370 498 Z" fill="#4A9A28" opacity="0.7"/>
      <path d="M372 512 Q390 500 394 488 Q387 486 374 498 Z" fill="#5AAA38" opacity="0.7"/>
      <path d="M248 295 L238 310 Q210 330 200 380 Q195 420 200 480 L290 480 Q298 420 296 380 Q294 340 290 310 L278 295 Z" fill="url(#pg-dress)"/>
      <path d="M200 350 Q180 370 178 400 Q180 428 200 440 Q218 448 228 435 Q232 418 230 395 Q228 368 210 350 Z" fill="#C84810"/>
      <ellipse cx="202" cy="393" rx="28" ry="35" fill="url(#pg-belly)" opacity="0.85"/>
      <circle cx="200" cy="393" r="7" fill="#FFE0A0" opacity="0.7"/>
      <path d="M202 370 Q246 364 294 372" stroke="#F5A070" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <path d="M200 400 Q245 394 296 403" stroke="#F5A070" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <path d="M200 432 Q245 426 296 435" stroke="#F5A070" strokeWidth="1.2" fill="none" opacity="0.35"/>
      <path d="M200 462 Q245 456 296 465" stroke="#F5A070" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M250 380 L255 386 L250 392 L245 386 Z" fill="#F5B080" opacity="0.5"/>
      <path d="M268 380 L273 386 L268 392 L263 386 Z" fill="#F5B080" opacity="0.5"/>
      <path d="M248 300 Q228 320 220 360 Q218 385 228 400 Q238 408 248 398 Q256 380 256 350 L256 305 Z" fill="#7A3518"/>
      <ellipse cx="228" cy="402" rx="16" ry="11" fill="#7A3518" transform="rotate(-25 228 402)"/>
      <path d="M218 398 Q224 408 232 408" stroke="#5A2010" strokeWidth="1" fill="none" opacity="0.5"/>
      <rect x="254" y="272" width="18" height="28" rx="4" fill="#7A3518"/>
      <ellipse cx="270" cy="248" rx="30" ry="34" fill="#7A3518"/>
      <ellipse cx="278" cy="244" rx="3" ry="3.5" fill="#1E0804"/>
      <ellipse cx="280" cy="243" rx="1" ry="1" fill="#FFFFFF" opacity="0.5"/>
      <path d="M274 237 Q280 234 286 237" stroke="#4A1808" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M284 250 Q288 256 286 262 Q283 264 280 262" stroke="#5A2010" strokeWidth="1.2" fill="none"/>
      <path d="M279 268 Q284 272 289 268" stroke="#8A3018" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M256 272 Q265 278 270 280" stroke="#5A2010" strokeWidth="1" fill="none" opacity="0.4"/>
      <ellipse cx="242" cy="252" rx="5" ry="7" fill="#6A2E14"/>
      <circle cx="242" cy="260" r="5" fill="#E06828"/>
      <circle cx="242" cy="260" r="2.5" fill="#F5C840"/>
      <path d="M243 230 Q244 208 270 200 Q296 208 297 230 Q294 218 270 214 Q246 218 243 230 Z" fill="#2A5E18"/>
      <path d="M246 228 Q244 200 256 176 Q264 158 270 146 Q276 158 284 176 Q296 200 294 228 Z" fill="#3A7828"/>
      <path d="M243 230 Q226 218 222 202 Q224 186 243 192 Q246 206 244 228 Z" fill="#2A5E18"/>
      <path d="M258 180 Q270 162 282 180" stroke="#6AAA50" strokeWidth="2.5" fill="none" opacity="0.6"/>
      <path d="M252 204 Q270 192 288 204" stroke="#4A8838" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M264 148 Q270 133 276 148 Q273 153 270 158 Q267 153 264 148 Z" fill="#2A5E18"/>
      <circle cx="50" cy="200" r="3" fill="#F5C840" opacity="0.5"/>
      <circle cx="440" cy="240" r="3.5" fill="#D85220" opacity="0.45"/>
      <circle cx="80" cy="360" r="2" fill="#6AAA50" opacity="0.5"/>
      <circle cx="430" cy="550" r="2.5" fill="#F5C840" opacity="0.45"/>
      <circle cx="200" cy="160" r="2" fill="#D85220" opacity="0.4"/>
      <circle cx="420" cy="460" r="2" fill="#6AAA50" opacity="0.45"/>
    </svg>
  )
}
