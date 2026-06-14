"use client"

interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
}

/**
 * Mum Companion logo - a stylized warm crescent with a small dot inside
 * (representing mother and child / new life). Custom mark.
 */
export function Logo({ className = "", size = 32, showText = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mum Companion logo"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E57C4D" />
            <stop offset="100%" stopColor="#9E381B" />
          </linearGradient>
        </defs>

        {/* Outer crescent (the mother) */}
        <path
          d="M 20 4
             A 16 16 0 1 0 20 36
             A 12 16 0 1 1 20 4 Z"
          fill="url(#logoGrad)"
        />

        {/* Inner dot (the child) */}
        <circle cx="24" cy="20" r="4" fill="#FFE3C2" />
      </svg>

      {showText && (
        <span className="font-display font-bold text-stone-800 text-lg tracking-tight">
          Mum Companion
        </span>
      )}
    </div>
  )
}
