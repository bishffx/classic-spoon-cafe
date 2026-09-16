import { cn } from '../lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const base = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={cn(base, 'max-w-2xl mb-10 md:mb-14', align === 'center' && 'max-w-xl', className)}>
      {eyebrow && (
        <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-terracotta">
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          'font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] font-semibold tracking-tight',
          align === 'center' && 'text-center',
        )}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={cn(
            'mt-4 text-[0.9375rem] leading-relaxed text-coffee',
            align === 'center' && 'text-center',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}