import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import CafeImage from '../components/CafeImage'
import Lightbox from '../components/Lightbox'
import { galleryImages } from '../data/gallery'
import { cn } from '../lib/cn'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'interior', label: 'Interior' },
  { id: 'moments', label: 'Moments' },
]

type FilterId = 'all' | 'food' | 'coffee' | 'interior' | 'moments'

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const visible = galleryImages.filter((g) => filter === 'all' || g.category === filter)

  return (
    <PageTransition>
      <Seo
        title="Gallery | Classic Spoon Cafe"
        description="A peek inside Classic Spoon Cafe in Bhubaneswar — food, coffee, corners and moments."
      />

      <header className="container-cafe pt-36 pb-10 md:pt-44">
        <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-terracotta">
          The gallery
        </p>
        <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-tight">
          PLATES & <span className="italic text-terracotta">PLACES</span>
        </h1>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-coffee">
          A little album from the café — what we serve, where you'll sit and the
          moments in between.
        </p>
      </header>

      {/* Filters */}
      <div className="container-cafe flex flex-wrap gap-2 pb-8">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id as FilterId)}
            className={cn('chip', filter === f.id && 'chip-active')}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <section className="container-cafe pb-28 md:pb-36">
        <div className="columns-2 gap-4 md:columns-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((image, i) => (
              <motion.button
                type="button"
                key={image.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-paper text-left md:mb-5"
                style={{ aspectRatio: image.aspect }}
                onClick={() => setLightboxIdx(i)}
                aria-label={`Open ${image.title} in lightbox`}
              >
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105">
                  <CafeImage src={image.image} alt={image.title} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-display text-lg font-semibold text-ivory">
                    {image.title}
                  </p>
                  <span className="text-right font-mono text-xs text-cream/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={visible}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNavigate={setLightboxIdx}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}