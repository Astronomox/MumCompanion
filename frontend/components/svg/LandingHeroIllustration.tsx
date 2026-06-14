"use client"

/**
 * Landing page hero illustration.
 * A wide composition: a Nigerian mother with baby tied to her back in the
 * traditional way, walking forward against a rising sun and rolling hills.
 * This is the centerpiece of the landing page hero.
 */
export function LandingHeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE3C2" />
          <stop offset="40%" stopColor="#F5C8B1" />
          <stop offset="80%" stopColor="#FDF3EF" />
          <stop offset="100%" stopColor="#FEFDF8" />
        </linearGradient>

        <radialGradient id="sunGradLanding" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="20%" stopColor="#FFE3C2" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#F2A65A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D95E2A" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hillGradFar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8EC38E" />
          <stop offset="100%" stopColor="#5FA35F" />
        </linearGradient>

        <linearGradient id="hillGradNear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D8240" />
          <stop offset="100%" stopColor="#214525" />
        </linearGradient>

        <linearGradient id="motherBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D95E2A" />
          <stop offset="100%" stopColor="#9E381B" />
        </linearGradient>

        <linearGradient id="babyWrap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C8B1" />
          <stop offset="100%" stopColor="#E57C4D" />
        </linearGradient>

        <linearGradient id="motherSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D2B1A" />
          <stop offset="100%" stopColor="#3A170B" />
        </linearGradient>

        <linearGradient id="geleGradLanding" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D8240" />
          <stop offset="100%" stopColor="#1C3920" />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect width="700" height="600" fill="url(#skyGrad)" />

      {/* Sun */}
      <circle cx="500" cy="220" r="180" fill="url(#sunGradLanding)" />
      <circle cx="500" cy="220" r="70" fill="#FFE3C2" opacity="0.9" />

      {/* Distant hills */}
      <path
        d="M 0 400
           Q 120 340 240 380
           Q 360 420 480 360
           Q 600 320 700 380
           L 700 600 L 0 600 Z"
        fill="url(#hillGradFar)"
        opacity="0.85"
      />

      {/* Nearer hills */}
      <path
        d="M 0 460
           Q 100 420 220 440
           Q 340 460 460 430
           Q 580 410 700 450
           L 700 600 L 0 600 Z"
        fill="url(#hillGradNear)"
      />

      {/* Floating bird silhouettes */}
      <g fill="#3A170B" opacity="0.5">
        <path d="M 180 180 Q 188 170 196 180 Q 200 175 204 180 Q 212 170 220 180" stroke="#3A170B" strokeWidth="1.5" fill="none" />
        <path d="M 260 140 Q 266 134 272 140 Q 275 137 278 140 Q 284 134 290 140" stroke="#3A170B" strokeWidth="1.5" fill="none" />
        <path d="M 90 230 Q 95 224 100 230 Q 103 227 106 230 Q 111 224 116 230" stroke="#3A170B" strokeWidth="1.2" fill="none" />
      </g>

      {/* MAIN FIGURE: Mother with baby on back (positioned left of center) */}
      <g transform="translate(280 320)">

        {/* Baby on back (peeking from cloth wrap) */}
        <ellipse cx="55" cy="-30" rx="30" ry="32" fill="#8B3D24" />
        <circle cx="48" cy="-32" r="2" fill="#1C3920" opacity="0.7" />
        <circle cx="58" cy="-32" r="2" fill="#1C3920" opacity="0.7" />
        <path d="M 50 -22 Q 55 -18 60 -22" stroke="#3A170B" strokeWidth="1" fill="none" />

        {/* Baby tiny hat */}
        <path d="M 28 -50 Q 55 -65 82 -50 L 80 -38 L 30 -38 Z" fill="#FFE3C2" />

        {/* Baby wrap cloth on mother's back */}
        <path
          d="M 30 -10
             Q 25 50 70 70
             Q 90 80 95 60
             L 90 -10
             Q 60 0 30 -10 Z"
          fill="url(#babyWrap)"
        />

        {/* Baby wrap stripes */}
        <g opacity="0.4" stroke="#9E381B" strokeWidth="1.5" fill="none">
          <path d="M 30 5 Q 60 10 90 5" />
          <path d="M 30 25 Q 60 30 90 25" />
          <path d="M 32 45 Q 60 50 88 45" />
        </g>

        {/* Mother body (full length wrapper) */}
        <path
          d="M -50 -15
             Q -80 30 -75 100
             Q -70 170 -60 230
             L 50 230
             Q 60 170 65 100
             Q 70 30 35 -15
             Z"
          fill="url(#motherBody)"
        />

        {/* Wrapper pattern */}
        <g opacity="0.3" stroke="#FFE3C2" strokeWidth="1" fill="none">
          <path d="M -73 50 Q 0 45 65 50" />
          <path d="M -75 90 Q 0 85 67 90" />
          <path d="M -73 130 Q 0 125 65 130" />
          <path d="M -70 170 Q 0 165 62 170" />
        </g>

        {/* Wrapper diamond accents */}
        <g opacity="0.5" fill="#FFE3C2">
          <path d="M -40 70 L -34 76 L -40 82 L -46 76 Z" />
          <path d="M 0 70 L 6 76 L 0 82 L -6 76 Z" />
          <path d="M 40 70 L 46 76 L 40 82 L 34 76 Z" />
          <path d="M -20 110 L -14 116 L -20 122 L -26 116 Z" />
          <path d="M 20 110 L 26 116 L 20 122 L 14 116 Z" />
        </g>

        {/* Visible arm */}
        <path
          d="M -50 -20
             Q -65 30 -55 80
             Q -50 100 -40 100
             Q -30 95 -28 80
             L -25 0 Z"
          fill="url(#motherSkin)"
        />

        {/* Neck */}
        <path d="M -12 -30 L -12 -55 L 12 -55 L 12 -30 Z" fill="url(#motherSkin)" />

        {/* Head */}
        <ellipse cx="0" cy="-90" rx="32" ry="38" fill="url(#motherSkin)" />

        {/* Eyes */}
        <ellipse cx="-10" cy="-90" rx="2" ry="2.5" fill="#1C3920" />
        <ellipse cx="10" cy="-90" rx="2" ry="2.5" fill="#1C3920" />

        {/* Smile */}
        <path d="M -8 -75 Q 0 -70 8 -75" stroke="#3A170B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Gele (large stylized headwrap) */}
        <path
          d="M -32 -105
             Q -55 -140 -25 -160
             Q 0 -175 25 -160
             Q 55 -140 32 -105
             Q 25 -90 10 -95
             Q 0 -100 -10 -95
             Q -25 -90 -32 -105 Z"
          fill="url(#geleGradLanding)"
        />

        {/* Gele fold detail */}
        <path
          d="M -28 -135 Q 0 -150 28 -135"
          stroke="#FFE3C2"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M -30 -120 Q 0 -130 30 -120"
          stroke="#1C3920"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Earring */}
        <circle cx="22" cy="-80" r="2" fill="#FFE3C2" />
      </g>

      {/* Foreground grass tufts */}
      <g fill="#214525" opacity="0.7">
        <path d="M 60 560 Q 65 540 70 560 Q 75 545 80 560 Z" />
        <path d="M 140 575 Q 145 555 150 575 Q 155 558 160 575 Z" />
        <path d="M 540 565 Q 545 545 550 565 Q 555 548 560 565 Z" />
        <path d="M 620 580 Q 625 560 630 580 Q 635 563 640 580 Z" />
        <path d="M 420 590 Q 425 572 430 590 Q 435 575 440 590 Z" />
      </g>

      {/* Floating warm particles */}
      <g fill="#FFE3C2">
        <circle cx="100" cy="120" r="3" opacity="0.7" />
        <circle cx="600" cy="80" r="4" opacity="0.7" />
        <circle cx="40" cy="320" r="2" opacity="0.6" />
        <circle cx="660" cy="280" r="3" opacity="0.6" />
        <circle cx="380" cy="100" r="2" opacity="0.6" />
        <circle cx="220" cy="60" r="2" opacity="0.5" />
      </g>
    </svg>
  )
}
