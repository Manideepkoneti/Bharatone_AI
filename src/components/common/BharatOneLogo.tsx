import React from 'react';

interface BharatOneLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animateGlow?: boolean;
}

export const BharatOneLogo: React.FC<BharatOneLogoProps> = ({
  size = 'md',
  className = '',
  animateGlow = false
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Subtle outer ambient glow for login & hero */}
      {animateGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/25 via-sky-400/20 to-emerald-500/25 blur-md animate-pulse" />
      )}

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Subtle India Tricolor Outer Ring Gradient */}
          <linearGradient id="bharatTricolorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7722" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>

          {/* Human Hand Warm Gradient */}
          <linearGradient id="humanHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA45B" />
            <stop offset="50%" stopColor="#FF7722" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          {/* AI Tech Neural Hand Gradient */}
          <linearGradient id="aiTechGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Central Core Sparkle */}
          <radialGradient id="centerSparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Shield - Subtle Indian Emblem/Mandala Inspired Base */}
        <circle cx="60" cy="60" r="54" fill="#0B0F19" stroke="url(#bharatTricolorGrad)" strokeWidth="2.5" strokeOpacity="0.85" />
        <circle cx="60" cy="60" r="48" fill="#0E1628" fillOpacity="0.6" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />

        {/* Subtle Map of India inspired geometry in background */}
        <path
          d="M60 18 L68 28 L74 38 L68 52 L78 62 L66 84 L60 98 L54 84 L42 62 L52 52 L46 38 L52 28 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.12"
          strokeDasharray="2 3"
        />

        {/* LEFT SIDE: HUMAN HAND (Stylized warm palm, gentle organic curves, human touch) */}
        <g id="human-side" opacity="0.95">
          {/* Palm Base */}
          <path
            d="M38 78 C34 70 34 60 38 52 C42 46 48 48 51 54 C53 58 54 66 52 74 C50 82 42 84 38 78 Z"
            fill="url(#humanHandGrad)"
          />
          {/* Thumb reaching center */}
          <path
            d="M48 55 C52 53 56 55 58 58 C59 60 57 62 53 62 C50 62 48 59 48 55 Z"
            fill="url(#humanHandGrad)"
          />
          {/* Human Fingers extending towards center/touch point */}
          <path
            d="M39 52 C41 42 45 35 48 30 C50 28 53 29 53 32 C53 38 49 46 47 53 Z"
            fill="url(#humanHandGrad)"
          />
          <path
            d="M45 50 C48 40 52 32 55 26 C57 24 60 25 59 28 C58 35 54 44 51 51 Z"
            fill="#FFB074"
          />
          <path
            d="M49 53 C52 44 57 37 60 31 C61 29 64 30 63 33 C61 40 57 48 54 54 Z"
            fill="url(#humanHandGrad)"
          />
        </g>

        {/* RIGHT SIDE: AI DIGITAL / NEURAL CIRCUIT HAND (Digital nodes, circuit tracks, geometric fingers) */}
        <g id="ai-side" opacity="0.95">
          {/* AI Circuit Finger Tracks */}
          <path
            d="M60 31 L64 34 L68 42 L67 52 L74 60 L70 76"
            stroke="url(#aiTechGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M66 28 L72 34 L75 46 L76 58 L82 66 L78 80"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 2"
          />
          <path
            d="M72 36 L78 44 L80 54 L84 66"
            stroke="#10B981"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* AI Neural Circuit Nodes (Glowing Dots) */}
          <circle cx="64" cy="34" r="2.5" fill="#38BDF8" />
          <circle cx="68" cy="42" r="2" fill="#FFFFFF" />
          <circle cx="67" cy="52" r="2.5" fill="#10B981" />
          <circle cx="74" cy="60" r="2" fill="#38BDF8" />
          <circle cx="72" cy="34" r="2" fill="#FFFFFF" />
          <circle cx="75" cy="46" r="2.5" fill="#38BDF8" />
          <circle cx="76" cy="58" r="2" fill="#10B981" />
          <circle cx="70" cy="76" r="3" fill="#2563EB" />

          {/* Circuit Branching lines */}
          <line x1="68" y1="42" x2="75" y2="46" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
          <line x1="67" y1="52" x2="76" y2="58" stroke="#10B981" strokeWidth="1" opacity="0.7" />
        </g>

        {/* CENTER CONNECTION: Touching Fingertips / Energy Confluence */}
        <circle cx="60" cy="31" r="7" fill="url(#centerSparkle)" />
        <circle cx="60" cy="31" r="2.5" fill="#FFFFFF" />
        <path
          d="M57 31 L63 31 M60 28 L60 34"
          stroke="#FFFFFF"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Ashoka / Tricolor Subtle Center Accent Dot */}
        <circle cx="60" cy="60" r="4.5" fill="#0B0F19" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="2" fill="#FF7722" />

        {/* Tricolor Micro-dots at bottom rim */}
        <circle cx="52" cy="106" r="2" fill="#FF7722" />
        <circle cx="60" cy="107" r="2" fill="#FFFFFF" opacity="0.9" />
        <circle cx="68" cy="106" r="2" fill="#138808" />
      </svg>
    </div>
  );
};
