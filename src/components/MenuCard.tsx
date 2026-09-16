import { ArrowUpRight } from 'lucide-react'
import { categoryLabel, type MenuItem } from '../types'
import CafeImage from './CafeImage'
import { cn } from '../lib/cn'

interface MenuCardProps {
  item: MenuItem
  index?: number
  className?: string
}

export default function MenuCard({ item, index, className }: MenuCardProps) {
  return (
    <article
      className={cn(
        'group relative grid grid-cols-[4.5rem_1fr_auto] gap-4 rounded-2xl border border-espresso/8 bg-ivory/60 p-4 transition-all duration-500 hover:-translate-y-1 hover:bg-ivory hover:shadow-[0_18px_40px_-24px_rgba(43,29,20,0.35)] md:grid-cols-[6rem_1fr_auto] md:gap-6 md:p-5',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-paper">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <CafeImage src={item.image} alt={item.name} />
        </div>
        {!item.veg && (
          <span className="absolute left-2 top-2 rounded-full bg-ivory/90 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-espresso">
            Non-veg
          </span>
        )}
      </div>

      {/* Body */}
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-3 md:block">
          {typeof index === 'number' && (
            <span className="mr-2 font-mono text-[0.6875rem] text-latte">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className="truncate font-display text-lg font-semibold leading-snug md:text-xl">
            {item.name}
          </h3>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-coffee">
          {item.description}
        </p>
        <p className="mt-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-terracotta">
          {categoryLabel(item.category)}
        </p>
      </div>

      {/* Price + arrow */}
      <div className="flex flex-col items-end justify-between self-stretch">
        <span className="font-display text-lg font-semibold text-espresso">
          ₹{item.price}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-espresso/10 text-espresso opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}