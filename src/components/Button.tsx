import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'dark' | 'outline' | 'ghost'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  showArrow?: boolean
  /** disable all page transitions — useful when href goes to a different domain */
  external?: boolean
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta text-ivory hover:bg-clay',
  dark: 'bg-espresso text-ivory hover:bg-charcoal',
  outline: 'border border-espresso/20 text-espresso hover:border-espresso/50',
  ghost: 'text-espresso hover:bg-espresso/5',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  showArrow = false,
  external = false,
  onClick,
}: ButtonProps) {
  const classes = cn(
    'group/btn relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[0.8125rem] font-semibold tracking-wide transition-all duration-300 cursor-pointer',
    variants[variant],
    className,
  )

  const arrow = (
    <ArrowRight className="inline-block h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
  )

  if (href) {
    if (external || href.startsWith('http')) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {children}
          {showArrow && arrow}
        </a>
      )
    }
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {children}
        {showArrow && arrow}
      </Link>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes}
      onClick={onClick}
      type="button"
    >
      {children}
      {showArrow && arrow}
    </motion.button>
  )
}