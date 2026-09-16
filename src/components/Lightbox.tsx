import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryImage } from '../types'
import CafeImage from './CafeImage'

interface LightboxProps {
  items: GalleryImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const current = items[index]

  const next = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  )
  const prev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, next, prev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory transition-transform hover:rotate-90"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="Previous image"
        className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory transition-transform hover:scale-105 md:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="Next image"
        className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory transition-transform hover:scale-105 md:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[min(92vw,74rem)]"
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) next()
          else if (info.offset.x > 80) prev()
        }}
      >
        <div className="overflow-hidden rounded-2xl">
          <div className="max-h-[74vh] w-full">
            <CafeImage src={current.image} alt={current.title} />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4 text-ivory">
          <div>
            <p className="font-display text-xl font-semibold">{current.title}</p>
            <p className="pt-2 font-display lowercase text-ivory/70 italic">
              {current.category}
            </p>
          </div>
          <p className="font-mono text-sm text-ivory/50">
            {index + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}