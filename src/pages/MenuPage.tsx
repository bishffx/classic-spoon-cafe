import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import MenuCard from '../components/MenuCard'
import { menuItems } from '../data/menu'
import { MENU_CATEGORIES, type MenuCategory } from '../types'

type Filter = 'all' | MenuCategory

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All' },
  ...MENU_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label.toUpperCase() })),
]

export default function MenuPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible =
    filter === 'all' ? menuItems : menuItems.filter((i) => i.category === filter)

  return (
    <PageTransition>
      <Seo
        title="Menu | Classic Spoon Cafe"
        description="Explore the Classic Spoon Cafe menu — coffee, tea, snacks, sandwiches, pasta, desserts and beverages in Bhubaneswar."
      />

      {/* Header */}
      <header className="container-cafe pt-36 pb-12 md:pt-44 md:pb-16">
        <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-terracotta">
          From the spoon
        </p>
        <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-tight">
          THE <span className="italic text-terracotta">MENU</span>
        </h1>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-coffee">
          Fresh pours, quicker snacks, proper meals. Ask us what's good today — we are
          rarely shy.
        </p>
      </header>

      {/* Filters */}
      <div className="container-cafe sticky top-[4.25rem] z-30 flex gap-2 overflow-x-auto border-y border-espresso/8 bg-cream/90 py-4 backdrop-blur-md [scrollbar-width:none] md:top-[4.75rem]">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`chip shrink-0 ${filter === f.id ? 'chip-active' : ''}`}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <section className="container-cafe py-10 pb-28 md:pb-36">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-coffee/60">
          {visible.length} item{visible.length !== 1 ? 's' : ''}
        </p>

        <motion.ul layout className="grid gap-4 md:grid-cols-2 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
              >
                <MenuCard item={item} className="h-full" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </PageTransition>
  )
}