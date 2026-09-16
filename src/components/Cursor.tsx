import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { safeMedia } from '../lib/media'

const OUTER_SIZE = 48
const DOT_SIZE = 8

export default function Cursor() {
  const [active, setActive] = useState(false)
  const [touch, setTouch] = useState(true)
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(-OUTER_SIZE)
  const y = useMotionValue(-OUTER_SIZE)
  const springConfig = { damping: 24, stiffness: 200, mass: 0.4 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)
  const raf = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const pointerFine = safeMedia('(pointer: fine)').matches
    if (!pointerFine) return
    setTouch(false)

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX - OUTER_SIZE / 2)
        y.set(e.clientY - OUTER_SIZE / 2)
      })
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, select, [data-cursor]')) {
        setActive(true)
      } else {
        setActive(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  if (touch || reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-espresso/40 transition-[width,height,border-color,opacity] duration-300 mix-blend-difference lg:block',
        active ? 'border-ivory opacity-100' : 'opacity-70',
      )}
      style={{
        width: active ? 64 : OUTER_SIZE,
        height: active ? 64 : OUTER_SIZE,
        x: sx,
        y: sy,
      }}
    />
  )
}