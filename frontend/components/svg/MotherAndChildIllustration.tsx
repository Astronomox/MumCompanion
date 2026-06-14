"use client"

/**
 * Hero illustration for the LOGIN page.
 * An original abstract composition: silhouette of a mother holding her baby,
 * a rising sun, ugu (pumpkin) leaves, and floating particles for warmth.
 * Built entirely from primitives. No external assets, no copyrighted art.
 */
export function MotherAndChildIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Warm radial sunrise behind the figures */}
        <radialGradient id="sunGrad" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#FFD9A8" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#F2A65A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D95E2A" stopOpacity="0" />
        </radialGradient>

        {/* Soft gradient for the mother's wrapper */}
        <linearGradient id="wrapperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D8240" />
          <stop offset="100%" stopColor="#214525" />
        </linearGradient>

        {/* Skin tone gradient */}
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D2B1A" />
          <stop offset="100%" stopColor="#4A1D12" />
        </linearGradient>

        {/* Headwrap (gele) gradient */}
        <linearGradient id="geleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E57C4D" />
          <stop offset="60%" stopColor="#D95E2A" />
          <stop offset="100%" stopColor="#9E381B" />
        </linearGradient>

        {/* Leaf gradient */}
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5FA35F" />
          <stop offset="100%" stopColor="#2D6630" />
        </linearGradient>
      </defs>

      {/* Background panel */}
      <rect width="600" height="800" fill="#1C3920" />

      {/* Decorative concentric arcs (background pattern) */}
      <g opacity="0.18" stroke="#5FA35F" fill="none" strokeWidth="1.5">
        <circle cx="300" cy="320" r="240" />
        <circle cx="300" cy="320" r="190" />
        <circle cx="300" cy="320" r="140" />
        <circle cx="300" cy="320" r="90" />
      </g>

      {/* Rising sun disc */}
      <circle cx="300" cy="320" r="220" fill="url(#sunGrad)" />

      {/* Ugu leaves bottom-left (pumpkin/jute style) */}
      <g transform="translate(40 600)" opacity="0.85">
        <path
          d="M 0 80 Q 30 20 90 30 Q 150 40 160 100 Q 130 130 70 120 Q 20 110 0 80 Z"
          fill="url(#leafGrad)"
        />
        <path d="M 10 85 Q 80 70 155 100" stroke="#1C3920" strokeWidth="1.5" fill="none" />
        <path d="M 40 65 Q 60 95 70 120" stroke="#1C3920" strokeWidth="1" fill="none" />
        <path d="M 80 55 Q 100 90 105 122" stroke="#1C3920" strokeWidth="1" fill="none" />
        <path d="M 120 55 Q 130 90 132 120" stroke="#1C3920" strokeWidth="1" fill="none" />
      </g>

      {/* Ugu leaves top-right */}
      <g transform="translate(440 80) rotate(35)" opacity="0.7">
        <path
          d="M 0 60 Q 25 15 75 25 Q 125 35 130 80 Q 105 105 55 95 Q 15 85 0 60 Z"
          fill="url(#leafGrad)"
        />
        <path d="M 10 65 Q 65 55 125 80" stroke="#1C3920" strokeWidth="1" fill="none" />
      </g>

      {/* Small abstract leaf cluster mid-right */}
      <g transform="translate(490 480) rotate(-20)" opacity="0.55">
        <path d="M 0 30 Q 15 0 40 5 Q 65 10 70 35 Q 50 50 25 45 Q 5 40 0 30 Z" fill="url(#leafGrad)" />
      </g>

      {/* MAIN FIGURE: Mother holding baby (centered) */}
      <g transform="translate(300 450)">

        {/* Mother body / wrapper */}
        <path
          d="M -110 200
             Q -130 100 -100 30
             Q -85 -20 -50 -40
             L 50 -40
             Q 85 -20 100 30
             Q 130 100 110 200
             L 100 220
             L -100 220
             Z"
          fill="url(#wrapperGrad)"
        />

        {/* Wrapper geometric pattern (subtle Nigerian textile feel) */}
        <g opacity="0.25" stroke="#FFD9A8" strokeWidth="1" fill="none">
          <line x1="-100" y1="20" x2="100" y2="20" />
          <line x1="-105" y1="60" x2="105" y2="60" />
          <line x1="-108" y1="100" x2="108" y2="100" />
          <line x1="-110" y1="140" x2="110" y2="140" />
          <line x1="-110" y1="180" x2="110" y2="180" />
        </g>

        {/* Wrapper diamond accents */}
        <g opacity="0.4" fill="#FFD9A8">
          <path d="M -60 80 L -50 90 L -60 100 L -70 90 Z" />
          <path d="M 0 80 L 10 90 L 0 100 L -10 90 Z" />
          <path d="M 60 80 L 70 90 L 60 100 L 50 90 Z" />
          <path d="M -30 140 L -20 150 L -30 160 L -40 150 Z" />
          <path d="M 30 140 L 40 150 L 30 160 L 20 150 Z" />
        </g>

        {/* Arms cradling baby */}
        <path
          d="M -85 20 Q -70 80 -20 90 Q 0 95 20 90 Q 70 80 85 20 L 80 -10 L -80 -10 Z"
          fill="url(#skinGrad)"
        />

        {/* Baby head */}
        <circle cx="0" cy="55" r="32" fill="#8B3D24" />

        {/* Baby wrapper (small cloth) */}
        <path
          d="M -35 75
             Q -40 110 -20 120
             L 20 120
             Q 40 110 35 75
             Z"
          fill="#FFD9A8"
        />

        {/* Baby tiny features (no expression details) */}
        <circle cx="-8" cy="55" r="2" fill="#1C3920" opacity="0.6" />
        <circle cx="8" cy="55" r="2" fill="#1C3920" opacity="0.6" />

        {/* Mother neck */}
        <path d="M -20 -40 L -22 -70 L 22 -70 L 20 -40 Z" fill="url(#skinGrad)" />

        {/* Mother head */}
        <ellipse cx="0" cy="-110" rx="48" ry="55" fill="url(#skinGrad)" />

        {/* Mother gele (headwrap) - large stylized */}
        <path
          d="M -55 -135
             Q -90 -180 -50 -210
             Q 0 -240 50 -210
             Q 90 -180 55 -135
             Q 50 -115 30 -120
             Q 0 -130 -30 -120
             Q -50 -115 -55 -135 Z"
          fill="url(#geleGrad)"
        />

        {/* Gele highlight */}
        <path
          d="M -40 -180 Q -10 -215 30 -200"
          stroke="#FFD9A8"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        {/* Gele fold detail */}
        <path
          d="M -50 -150 Q 0 -175 50 -150"
          stroke="#6D2B1A"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* Floating particles / fireflies for warmth */}
      <g fill="#FFD9A8">
        <circle cx="80" cy="200" r="3" opacity="0.6" />
        <circle cx="520" cy="160" r="4" opacity="0.7" />
        <circle cx="150" cy="380" r="2" opacity="0.5" />
        <circle cx="480" cy="380" r="3" opacity="0.6" />
        <circle cx="90" cy="450" r="2" opacity="0.4" />
        <circle cx="540" cy="540" r="3" opacity="0.6" />
        <circle cx="60" cy="700" r="3" opacity="0.5" />
        <circle cx="510" cy="720" r="2" opacity="0.4" />
        <circle cx="200" cy="120" r="2" opacity="0.5" />
        <circle cx="410" cy="730" r="2" opacity="0.5" />
      </g>

      {/* Subtle ground line / horizon */}
      <path
        d="M 0 720 Q 300 700 600 720"
        stroke="#3D8240"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  )
}
