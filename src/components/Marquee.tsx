import { cn } from '../lib/cn'

interface MarqueeProps {
  text: string
  reverse?: boolean
  className?: string
}

export default function Marquee({ text, reverse, className }: MarqueeProps) {
  const repeated = Array(6).fill(text)

  return (
    <div
      className={cn('overflow-hidden whitespace-nowrap', className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          'inline-flex gap-[3em] font-display text-[clamp(2.5rem,7vw,5rem)] leading-none font-semibold tracking-tight text-espresso/[0.06] uppercase',
          reverse ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        {repeated.map((t, i) => (
          <span key={i} className="pr-[3em] select-none">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}