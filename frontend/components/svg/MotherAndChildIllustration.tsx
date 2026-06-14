"use client"

export function MotherAndChildIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 640" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mc-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#6AAA50" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#1C3920" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="mc-wrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A7828"/>
          <stop offset="100%" stopColor="#1E4E14"/>
        </linearGradient>
        <linearGradient id="mc-gele" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E06828"/>
          <stop offset="100%" stopColor="#9E3810"/>
        </linearGradient>
        <linearGradient id="mc-baby-wrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E0B0"/>
          <stop offset="100%" stopColor="#E8C078"/>
        </linearGradient>
      </defs>
      <rect width="480" height="640" fill="#1C3920"/>
      <circle cx="240" cy="260" r="220" fill="url(#mc-glow)"/>
      <circle cx="240" cy="280" r="195" stroke="#2E6020" strokeWidth="1" fill="none" opacity="0.5"/>
      <circle cx="240" cy="280" r="155" stroke="#2E6020" strokeWidth="1" fill="none" opacity="0.4"/>
      <circle cx="240" cy="280" r="115" stroke="#3A7828" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M60 420 Q30 360 80 310 Q130 270 170 320 Q200 360 180 410 Q140 440 60 420 Z" fill="#2E6020" opacity="0.8"/>
      <path d="M70 415 Q110 360 168 322" stroke="#1C3920" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M85 375 Q115 360 155 350" stroke="#1C3920" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M100 400 Q128 385 158 375" stroke="#1C3920" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M420 380 Q460 310 410 265 Q360 235 320 285 Q295 325 315 375 Q355 405 420 380 Z" fill="#2E6020" opacity="0.7"/>
      <path d="M410 372 Q360 320 324 288" stroke="#1C3920" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M380 140 Q420 100 440 140 Q450 170 420 185 Q395 185 380 160 Z" fill="#3A7828" opacity="0.6" transform="rotate(-15 410 145)"/>
      <ellipse cx="240" cy="340" rx="55" ry="40" fill="url(#mc-baby-wrap)"/>
      <circle cx="240" cy="302" r="30" fill="#8B4020"/>
      <circle cx="232" cy="300" r="2.5" fill="#2A0E04" opacity="0.8"/>
      <circle cx="248" cy="300" r="2.5" fill="#2A0E04" opacity="0.8"/>
      <path d="M234 310 Q240 314 246 310" stroke="#3A1408" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M212 295 Q212 270 240 262 Q268 270 268 295 Q266 285 240 282 Q214 285 212 295 Z" fill="#F5C840" opacity="0.9"/>
      <path d="M235 263 L240 252 L245 263" fill="#E8A820"/>
      <path d="M188 340 Q240 332 292 342" stroke="#C89A48" strokeWidth="2" fill="none" opacity="0.55"/>
      <path d="M186 354 Q240 346 294 357" stroke="#C89A48" strokeWidth="1.5" fill="none" opacity="0.45"/>
      <path d="M190 368 Q240 360 290 370" stroke="#C89A48" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M170 310 Q160 360 175 385 Q190 395 205 380 Q215 360 220 340 L220 310 Z" fill="#6A2E14"/>
      <path d="M310 310 Q320 360 305 385 Q290 395 275 380 Q265 360 260 340 L260 310 Z" fill="#6A2E14"/>
      <ellipse cx="192" cy="382" rx="14" ry="10" fill="#6A2E14" transform="rotate(-10 192 382)"/>
      <ellipse cx="288" cy="382" rx="14" ry="10" fill="#6A2E14" transform="rotate(10 288 382)"/>
      <path d="M192 305 Q175 380 170 490 L310 490 Q305 380 288 305 Z" fill="url(#mc-wrap)"/>
      <path d="M176 370 Q240 364 304 372" stroke="#6AAA50" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <path d="M174 400 Q240 394 306 403" stroke="#6AAA50" strokeWidth="1.2" fill="none" opacity="0.4"/>
      <path d="M173 430 Q240 424 307 433" stroke="#6AAA50" strokeWidth="1.2" fill="none" opacity="0.35"/>
      <path d="M173 460 Q240 454 307 463" stroke="#6AAA50" strokeWidth="1.2" fill="none" opacity="0.3"/>
      <path d="M218 412 L224 419 L218 426 L212 419 Z" fill="#A8D878" opacity="0.5"/>
      <path d="M240 412 L246 419 L240 426 L234 419 Z" fill="#A8D878" opacity="0.5"/>
      <path d="M262 412 L268 419 L262 426 L256 419 Z" fill="#A8D878" opacity="0.5"/>
      <rect x="226" y="285" width="22" height="28" rx="5" fill="#6A2E14"/>
      <ellipse cx="237" cy="258" rx="34" ry="38" fill="#7A3518"/>
      <ellipse cx="228" cy="255" rx="2.5" ry="3" fill="#1E0804"/>
      <ellipse cx="246" cy="255" rx="2.5" ry="3" fill="#1E0804"/>
      <path d="M228 268 Q237 274 246 268" stroke="#4A1808" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M235 261 Q237 266 239 261" stroke="#4A1808" strokeWidth="1" fill="none"/>
      <ellipse cx="204" cy="258" rx="5" ry="6.5" fill="#6A2E14"/>
      <circle cx="204" cy="266" r="4" fill="#E06828"/>
      <circle cx="204" cy="266" r="2" fill="#F5C840"/>
      <path d="M204 240 Q205 215 237 206 Q269 215 270 240 Q268 228 237 224 Q206 228 204 240 Z" fill="#C04010"/>
      <path d="M206 238 Q204 210 220 188 Q230 172 237 162 Q244 172 254 188 Q270 210 268 238 Z" fill="#D85220"/>
      <path d="M208 236 Q205 200 222 174 Q230 158 237 146 Q244 158 252 174 Q269 200 266 236 Z" fill="#E06828"/>
      <path d="M204 240 Q188 228 184 212 Q186 196 204 200 Q208 212 206 238 Z" fill="#C04010"/>
      <path d="M270 240 Q286 228 290 212 Q288 196 270 200 Q272 212 268 238 Z" fill="#C04010"/>
      <path d="M220 188 Q237 170 254 188" stroke="#F58848" strokeWidth="2.5" fill="none" opacity="0.55"/>
      <path d="M215 210 Q237 198 259 210" stroke="#E87040" strokeWidth="2" fill="none" opacity="0.45"/>
      <path d="M210 228 Q237 220 264 228" stroke="#C86020" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M231 148 Q237 132 243 148 Q240 153 237 158 Q234 153 231 148 Z" fill="#C85020"/>
      <circle cx="80" cy="200" r="3" fill="#6AAA50" opacity="0.55"/>
      <circle cx="400" cy="180" r="4" fill="#6AAA50" opacity="0.5"/>
      <circle cx="60" cy="500" r="2.5" fill="#F5C840" opacity="0.5"/>
      <circle cx="420" cy="480" r="3" fill="#F5C840" opacity="0.45"/>
      <circle cx="140" cy="380" r="2" fill="#FFD08A" opacity="0.45"/>
      <circle cx="360" cy="420" r="2" fill="#FFD08A" opacity="0.45"/>
    </svg>
  )
}
