import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuredItems } from '../../data/menu'
import { categoryLabel, type MenuItem } from '../../types'
import CafeImage from '../CafeImage'
import SectionHeading from '../SectionHeading'
import { cn } from '../../lib/cn'

const EASE = [0.22, 1, 0.36, 1] as const
const items = featuredItems.slice(0, 6)

function Row({
  item,
  active,
  onEnter,
}: {
  item: MenuItem
  active: boolean
  onEnter: () => void
}) {
  return (
    <li
      role="button"
      tabIndex={0}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cn(
        'group grid grid-cols-[1.25rem_1fr_auto] items-center gap-4 border-b border-espresso/8 py-5 transition-all duration-500 cursor-pointer',
        active
          ? 'text-espresso'
          : 'text-espresso/60 hover:text-espresso/90',
      )}
    >
      <span className="font-mono text-[0.6875rem] text-terracotta">
        {String(items.indexOf(item) + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-xl font-semibold leading-snug">
          {item.name}
        </p>
        <p className="mt-0.5 text-[0.6875rem] uppercase tracking-wider text-coffee/70">
          {categoryLabel(item.category)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-display text-lg font-semibold">₹{item.price}</span>
        <span
          className={cn(
            'grid h-8 w-8 place-items-center rounded-full border border-espresso/10 transition-all duration-300',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </li>
  )
}

export default function FeaturedMenu() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex] ?? items[0]

  return (
    <section className="container-cafe py-24 md:py-32">
      <SectionHeading
        eyebrow="From the Spoon"
        title="A taste of the menu"
        intro="Some of the things we pour our heart into — pull up a chair and stay a while."
      />

      <div className="grid gap-8 md:grid-cols-[1fr_0.75fr] lg:grid-cols-[1fr_0.65fr] lg:gap-12">
        {/* List */}
        <ul>
          {items.map((item, i) => (
            <Row
              key={item.id}
              item={item}
              active={i === activeIndex}
              onEnter={() => setActiveIndex(i)}
            />
          ))}
        </ul>

        {/* Sticky image */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-paper">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0"
              >
                <CafeImage src={active.image} alt={active.name} />
              </motion.div>
            </AnimatePresence>

            {/* Label overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent p-6">
              <p className="font-display text-2xl font-semibold text-ivory">{active.name}</p>
              <p className="mt-1 text-xs text-cream/80">{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}