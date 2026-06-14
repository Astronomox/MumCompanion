"use client"

/**
 * Hero illustration for the SIGNUP page.
 * Composition: stylized pregnant woman in profile with a luminous belly,
 * surrounded by sprouting seedlings and a warm crescent sun.
 * Different from the login illustration so both pages feel distinct.
 */
export function PregnancyGrowthIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="moonGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE3C2" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F2A65A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D95E2A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bellyGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE3C2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFE3C2" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="profileSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D2B1A" />
          <stop offset="100%" stopColor="#3A170B" />
        </linearGradient>

        <linearGradient id="profileDress" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D95E2A" />
          <stop offset="100%" stopColor="#9E381B" />
        </linearGradient>

        <linearGradient id="profileGele" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D8240" />
          <stop offset="100%" stopColor="#214525" />
        </linearGradient>

        <linearGradient id="sproutGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5FA35F" />
          <stop offset="100%" stopColor="#8EC38E" />
        </linearGradient>
      </defs>

      {/* Cream base background */}
      <rect width="600" height="800" fill="#FAF3D7" />

      {/* Soft warm wash */}
      <rect width="600" height="800" fill="#FDF3EF" opacity="0.5" />

      {/* Decorative concentric circles top */}
      <g opacity="0.18" stroke="#D95E2A" fill="none" strokeWidth="1.2">
        <circle cx="430" cy="180" r="200" />
        <circle cx="430" cy="180" r="160" />
        <circle cx="430" cy="180" r="120" />
        <circle cx="430" cy="180" r="80" />
        <circle cx="430" cy="180" r="40" />
      </g>

      {/* Warm sun glow */}
      <circle cx="430" cy="180" r="160" fill="url(#moonGrad)" />

      {/* Crescent shape */}
      <path
        d="M 430 60
           A 120 120 0 1 0 430 300
           A 90 120 0 1 1 430 60 Z"
        fill="#E57C4D"
        opacity="0.55"
      />

      {/* Horizontal terracotta pattern lines (textile motif) */}
      <g opacity="0.3" stroke="#D95E2A" strokeWidth="1">
        <line x1="60" y1="120" x2="240" y2="120" />
        <line x1="60" y1="135" x2="220" y2="135" />
        <line x1="60" y1="150" x2="200" y2="150" />
      </g>

      {/* Bottom geometric pattern */}
      <g transform="translate(0 720)" opacity="0.35">
        <pattern id="diamondPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 20 5 L 35 20 L 20 35 L 5 20 Z" fill="none" stroke="#D95E2A" strokeWidth="1" />
        </pattern>
        <rect x="0" y="0" width="600" height="80" fill="url(#diamondPattern)" />
      </g>

      {/* Sprouting plants on left side */}
      <g transform="translate(80 580)">
        {/* Stem 1 */}
        <path
          d="M 0 100 Q 5 50 0 0"
          stroke="url(#sproutGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M 0 30 Q -25 25 -30 10 Q -20 15 0 25" fill="url(#sproutGrad)" />
        <path d="M 0 50 Q 25 45 30 30 Q 20 35 0 45" fill="url(#sproutGrad)" />

        {/* Stem 2 */}
        <g transform="translate(35 20)">
          <path
            d="M 0 80 Q 8 40 0 0"
            stroke="url(#sproutGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M 0 25 Q -20 20 -24 8 Q -16 13 0 20" fill="url(#sproutGrad)" />
        </g>

        {/* Stem 3 */}
        <g transform="translate(-30 30)">
          <path
            d="M 0 70 Q -4 35 0 0"
            stroke="url(#sproutGrad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M 0 20 Q 18 18 22 6 Q 14 12 0 16" fill="url(#sproutGrad)" />
        </g>
      </g>

      {/* MAIN FIGURE: Pregnant woman in profile */}
      <g transform="translate(290 440)">

        {/* Dress body with pregnancy curve */}
        <path
          d="M -30 -50
             L -40 0
             Q -90 20 -100 90
             Q -95 140 -75 170
             L -80 280
             L 60 280
             L 50 170
             Q 30 140 25 90
             L 20 -50
             Z"
          fill="url(#profileDress)"
        />

        {/* Dress textile stripes */}
        <g opacity="0.3" stroke="#FFD9A8" strokeWidth="1.5" fill="none">
          <path d="M -78 200 Q 0 195 55 200" />
          <path d="M -77 230 Q 0 225 53 230" />
          <path d="M -76 260 Q 0 255 52 260" />
        </g>

        {/* Belly glow (life inside) */}
        <ellipse cx="-55" cy="80" rx="40" ry="50" fill="url(#bellyGlowGrad)" opacity="0.9" />
        <circle cx="-55" cy="80" r="6" fill="#FFE3C2" opacity="0.8" />

        {/* Arm cradling belly */}
        <path
          d="M -30 30
             Q -90 50 -95 100
             Q -90 130 -70 130
             Q -55 125 -45 100
             Q -40 60 -25 50 Z"
          fill="url(#profileSkin)"
        />

        {/* Hand on belly (simplified) */}
        <ellipse cx="-80" cy="115" rx="14" ry="10" fill="url(#profileSkin)" transform="rotate(-20 -80 115)" />

        {/* Neck */}
        <path d="M 5 -50 L 5 -85 L 25 -85 L 25 -50 Z" fill="url(#profileSkin)" />

        {/* Head (profile) */}
        <path
          d="M 15 -160
             Q 50 -160 55 -120
             Q 58 -90 45 -85
             L 25 -85
             Q 0 -90 0 -120
             Q 0 -160 15 -160 Z"
          fill="url(#profileSkin)"
        />

        {/* Eye */}
        <ellipse cx="38" cy="-125" rx="3" ry="2" fill="#1C3920" />

        {/* Nose hint */}
        <path d="M 50 -120 L 56 -115 L 50 -110" stroke="#3A170B" strokeWidth="1" fill="none" />

        {/* Lips hint */}
        <path d="M 48 -100 L 53 -100" stroke="#6D2B1A" strokeWidth="2" />

        {/* Ear hint */}
        <circle cx="20" cy="-115" r="3" fill="#3A170B" />

        {/* Gele (headwrap, profile) - tall and stylized */}
        <path
          d="M -5 -155
             Q -25 -200 0 -225
             Q 30 -245 60 -225
             Q 75 -210 70 -185
             Q 65 -165 55 -160
             Q 30 -155 -5 -155 Z"
          fill="url(#profileGele)"
        />

        {/* Gele wrap detail */}
        <path
          d="M 0 -185 Q 30 -210 60 -200"
          stroke="#FFD9A8"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M -2 -170 Q 30 -180 65 -175"
          stroke="#1C3920"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Earring */}
        <circle cx="20" cy="-105" r="2" fill="#FFD9A8" />
      </g>

      {/* Floating particles */}
      <g fill="#D95E2A">
        <circle cx="100" cy="250" r="2.5" opacity="0.5" />
        <circle cx="520" cy="450" r="3" opacity="0.6" />
        <circle cx="60" cy="450" r="2" opacity="0.4" />
        <circle cx="540" cy="320" r="2.5" opacity="0.5" />
        <circle cx="150" cy="350" r="1.5" opacity="0.4" />
        <circle cx="180" cy="170" r="2" opacity="0.5" />
        <circle cx="500" cy="600" r="2.5" opacity="0.5" />
      </g>

      <g fill="#3D8240" opacity="0.4">
        <circle cx="450" cy="500" r="3" />
        <circle cx="120" cy="400" r="2" />
        <circle cx="540" cy="700" r="2.5" />
        <circle cx="80" cy="700" r="2" />
      </g>
    </svg>
  )
}
