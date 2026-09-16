import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { cafe } from '../../data/cafe'
import CafeImage from '../CafeImage'

const EASE = [0.22, 1, 0.36, 1] as const

function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function RotatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
      className="absolute -left-5 -top-5 z-20 grid h-24 w-24 place-items-center rounded-full bg-espresso text-cream shadow-xl md:h-28 md:w-28"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <text
          fill="currentColor"
          fontSize="9.5"
          fontFamily="Manrope, sans-serif"
          fontWeight="600"
          letterSpacing="2.6"
        >
          <textPath href="#badge-circle">GOOD FOOD · GREAT COFFEE · GOOD VIBES ·</textPath>
        </text>
      </svg>
      <span className="font-display text-lg font-semibold italic">cafe</span>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 70, damping: 20 })
  const smy = useSpring(my, { stiffness: 70, damping: 20 })
  const imgX = useTransform(smx, [-1, 1], [-16, 16])
  const imgShiftY = useTransform(smy, [-1, 1], [-12, 12])
  const cardX = useTransform(smx, [-1, 1], [10, -10])
  const badgeX = useTransform(smx, [-1, 1], [-8, 8])

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Outlined backdrop word */}
      <motion.span
        style={reduced ? undefined : { y: wordY }}
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -right-[4%] top-[18%] select-none font-display text-[26vw] leading-none font-bold"
      >
        COFFEE
      </motion.span>

      <div className="container-cafe relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Editorial type */}
        <motion.div style={reduced ? undefined : { y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mb-6 flex items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-terracotta"
          >
            <span className="h-px w-10 bg-terracotta" />
            Café · Bhubaneswar
          </motion.p>

          <h1 className="font-display font-semibold text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.88] tracking-[-0.02em]">
            <RevealLine delay={0.15}>CLASSIC</RevealLine>
            <RevealLine delay={0.26} className="text-outline">
              SPOON
            </RevealLine>
            <RevealLine delay={0.37} className="italic text-terracotta">
              CAFÉ.
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="mt-7 max-w-md text-base leading-relaxed text-coffee md:text-lg"
          >
            {cafe.tagline} A cosy corner in Nuagan for slow mornings, long chats and
            plates that keep the conversation going.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta"
            >
              Explore the menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-espresso/20 px-7 py-3.5 text-[0.8125rem] font-semibold text-espresso transition-colors hover:border-espresso/60"
            >
              Visit Us
            </Link>
          </motion.div>

          {/* Values strip */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 1, staggerChildren: 0.07 } },
            }}
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {cafe.values.map((value) => (
              <motion.li
                key={value}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-[0.625rem] font-bold uppercase tracking-[0.22em] text-espresso/50"
              >
                {value}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Image composition */}
        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0"
        >
          <RotatingBadge />

          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 2rem)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            className="relative"
          >
            <motion.div
              style={reduced ? undefined : { x: imgX, y: imgShiftY }}
              className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper shadow-[0_40px_80px_-50px_rgba(43,29,20,0.6)]"
            >
              <CafeImage src="coffee" alt="A warm cup of coffee at Classic Spoon Cafe" />
            </motion.div>
          </motion.div>

          {/* Secondary card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
            style={reduced ? undefined : { x: cardX }}
            className="absolute -bottom-8 -left-6 z-10 w-36 overflow-hidden rounded-2xl border-4 border-cream bg-paper shadow-xl md:w-44"
          >
            <div className="aspect-square">
              <CafeImage src="sandwich" alt="A grilled sandwich" />
            </div>
          </motion.div>

          {/* Small label card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            style={reduced ? undefined : { x: badgeX }}
            className="absolute -right-3 top-1/2 z-10 rounded-full bg-ivory/90 px-4 py-2 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-espresso shadow-lg backdrop-blur md:-right-6"
          >
            Good times
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.24em] text-espresso/45 md:flex"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        Scroll
      </motion.div>
    </section>
  )
}