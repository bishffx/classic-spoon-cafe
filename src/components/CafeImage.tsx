import { useId } from 'react'
import { cn } from '../lib/cn'
import type { ImageSource, PlaceholderVariant } from '../types'

/**
 * Drop-in image component.
 *
 * - String ending with a file extension (`.jpg`, `.png`, …) renders a real `<img>`.
 * - Any other string (or a `PlaceholderVariant`) renders a warm, editorial SVG
 *   placeholder that reads as an intentional part of the design.
 */
interface CafeImageProps {
  src: ImageSource
  alt: string
  className?: string
  /** Squash to square crop regardless of intrinsic aspect. */
  square?: boolean
}

const TONES: Record<PlaceholderVariant, { a: string; b: string; ink: string }> = {
  coffee: { a: '#E8D5BE', b: '#F6EDDD', ink: '#5A3A26' },
  tea: { a: '#D7DCC7', b: '#F0F0E2', ink: '#4D5336' },
  sandwich: { a: '#E3C9A6', b: '#F7EDDA', ink: '#5A3A26' },
  pasta: { a: '#E2B48F', b: '#F8E7D3', ink: '#6B3E22' },
  dessert: { a: '#E6CDAE', b: '#FAF0E0', ink: '#5A3A26' },
  snack: { a: '#DCC8A9', b: '#F6ECD9', ink: '#54382A' },
  beverage: { a: '#E9D6B4', b: '#FBF1DE', ink: '#5A3F22' },
  interior: { a: '#C9B49A', b: '#EDE1CE', ink: '#3B2A1C' },
}

const VALID_VARIANTS = new Set<string>(Object.keys(TONES) as PlaceholderVariant[])

function resolveVariant(src: string): PlaceholderVariant {
  return VALID_VARIANTS.has(src) ? (src as PlaceholderVariant) : 'coffee'
}

function PlaceholderIcon({ variant, ink }: { variant: PlaceholderVariant; ink: string }) {
  switch (variant) {
    case 'coffee':
      return (
        <g transform="translate(130,140)">
          <rect width="140" height="100" rx="14" stroke={ink} strokeWidth="4" fill="none" />
          <ellipse cx="70" cy="0" rx="70" ry="16" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M140 30 a32 32 0 0 1 0 52" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M40 -16 Q50 -34 60 -16" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M60 -16 Q70 -34 80 -16" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M80 -16 Q90 -34 100 -16" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
        </g>
      )
    case 'tea':
      return (
        <g transform="translate(120,130)">
          <ellipse cx="80" cy="60" rx="80" ry="60" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M40 38 a40 30 0 0 0 80 0" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M50 -24 Q60 -48 70 -24" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M72 -24 Q82 -48 92 -24" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M94 -24 Q104 -48 114 -24" stroke={ink} strokeWidth="3" fill="none" opacity="0.6" />
        </g>
      )
    case 'sandwich':
      return (
        <g transform="translate(110,110)">
          <polygon points="90,0 180,100 0,100" stroke={ink} strokeWidth="4" fill="none" />
          <polygon points="90,18 168,100 12,100" stroke={ink} strokeWidth="3" fill="none" opacity="0.5" />
          <line x1="10" y1="118" x2="170" y2="118" stroke={ink} strokeWidth="3" opacity="0.4" />
          <line x1="0" y1="136" x2="180" y2="136" stroke={ink} strokeWidth="3" opacity="0.4" />
        </g>
      )
    case 'pasta':
      return (
        <g transform="translate(90,120)">
          <ellipse cx="110" cy="80" rx="110" ry="36" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M0 80 a110 48 0 0 0 220 0" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M40 50 Q70 20 100 50 t60 0 t50 0" stroke={ink} strokeWidth="3" fill="none" opacity="0.5" />
        </g>
      )
    case 'dessert':
      return (
        <g transform="translate(130,110)">
          <polygon points="70,0 140,130 0,130" stroke={ink} strokeWidth="4" fill="none" />
          <line x1="20" y1="86" x2="120" y2="86" stroke={ink} strokeWidth="3" opacity="0.5" />
          <circle cx="70" cy="38" r="8" stroke={ink} strokeWidth="3" fill="none" />
        </g>
      )
    case 'snack':
      return (
        <g transform="translate(90,130)">
          <ellipse cx="110" cy="60" rx="110" ry="32" stroke={ink} strokeWidth="4" fill="none" />
          <circle cx="80" cy="44" r="18" stroke={ink} strokeWidth="3" fill="none" />
          <circle cx="130" cy="38" r="14" stroke={ink} strokeWidth="3" fill="none" />
          <circle cx="60" cy="28" r="10" stroke={ink} strokeWidth="3" fill="none" />
        </g>
      )
    case 'beverage':
      return (
        <g transform="translate(145,100)">
          <path d="M25 0 h50 l-8 170 a12 12 0 0 1 -12 10 h-10 a12 12 0 0 1 -12 -10 z" stroke={ink} strokeWidth="4" fill="none" />
          <line x1="50" y1="-28" x2="38" y2="40" stroke={ink} strokeWidth="3" opacity="0.5" />
          <circle cx="50" cy="60" r="4" stroke={ink} strokeWidth="2.5" fill="none" opacity="0.45" />
          <circle cx="40" cy="90" r="3.5" stroke={ink} strokeWidth="2.5" fill="none" opacity="0.45" />
        </g>
      )
    case 'interior':
      return (
        <g transform="translate(100,100)">
          <path d="M0 140 v-80 a100 80 0 0 1 200 0 v80" stroke={ink} strokeWidth="4" fill="none" />
          <path d="M0 140 h200" stroke={ink} strokeWidth="3" fill="none" opacity="0.4" />
          <line x1="100" y1="60" x2="100" y2="140" stroke={ink} strokeWidth="3" opacity="0.4" />
          <ellipse cx="100" cy="46" rx="30" ry="12" stroke={ink} strokeWidth="3" fill="none" opacity="0.5" />
          <circle cx="50" cy="110" r="24" stroke={ink} strokeWidth="3" fill="none" opacity="0.35" />
          <circle cx="150" cy="110" r="24" stroke={ink} strokeWidth="3" fill="none" opacity="0.35" />
        </g>
      )
  }
}

function PlaceholderSVG({ variant, title }: { variant: PlaceholderVariant; title?: string }) {
  const { a, b, ink } = TONES[variant]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '') + '-' + variant

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="500" fill={`url(#g-${uid})`} />

      {/* Decorative blobs */}
      <circle cx="320" cy="80" r="100" fill={a} opacity="0.35" />
      <circle cx="80" cy="420" r="90" fill={b} opacity="0.45" />

      {/* Icon */}
      <PlaceholderIcon variant={variant} ink={ink} />

      {/* Caption */}
      {title && (
        <text
          x="32"
          y="472"
          fontFamily='"Playfair Display", Georgia, serif'
          fontSize="26"
          fontStyle="italic"
          fill={ink}
          opacity="0.85"
        >
          {title}
        </text>
      )}

      {/* Tag */}
      <text
        x="368"
        y="38"
        fontFamily="Manrope, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2"
        textAnchor="end"
        fill={ink}
        opacity="0.4"
      >
        PLACEHOLDER
      </text>
    </svg>
  )
}

export default function CafeImage({ src, alt, className }: CafeImageProps) {
  // Real image (has a file extension)
  if (typeof src === 'string' && /\.[a-z]{2,4}$/i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <PlaceholderSVG variant={resolveVariant(src as string)} title={alt?.split(' ')[0]} />
  )
}