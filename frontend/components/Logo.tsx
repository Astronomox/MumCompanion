"use client"

let _id = 0

interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
  light?: boolean
}

export function Logo({ className = "", size = 32, showText = true, light = false }: LogoProps) {
  // Unique gradient ID per instance so multiple Logos on the same page don't clash
  const uid = `lgG${++_id}`

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mum AI Companion logo"
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e9a5b" />
            <stop offset="100%" stopColor="#1c4f29" />
          </linearGradient>
        </defs>
        {/* Leaf body */}
        <path
          d="M20 4 C30 4 36 12 36 22 C36 30 30 36 20 36 C12 36 6 30 6 22 C6 12 12 4 20 4 Z"
          fill={`url(#${uid})`}
        />
        {/* Heart cutout - mother + child */}
        <path
          d="M20 28 C16 24 12 21 12 17 C12 14.5 14 13 16 13 C17.5 13 19 14 20 15.5 C21 14 22.5 13 24 13 C26 13 28 14.5 28 17 C28 21 24 24 20 28 Z"
          fill="#F4EFE3"
        />
        {/* Baby dot */}
        <circle cx="20" cy="19" r="2.5" fill="#C9A24B" />
      </svg>

      {showText && (
        <span
          className={`font-serif font-semibold text-lg tracking-tight leading-none ${
            light ? "text-cream-50" : "text-forest-800"
          }`}
          style={{ listStyle: "none" }}
        >
          Mum AI Companion
        </span>
      )}
    </div>
  )
}
