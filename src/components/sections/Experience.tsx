import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import CafeImage from '../CafeImage'

const CoffeeCup3D = lazy(() => import('../CoffeeCup3D'))

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return isDesktop
}

interface Panel {
  id: string
  kicker: string
  title: string
  copy: string
  image: 'coffee' | 'sandwich' | 'interior' | 'dessert'
}

const PANELS: Panel[] = [
  {
    id: 'p1',
    kicker: 'The café',
    title: 'YOUR TABLE IS WAITING.',
    copy: 'Walk in, pick a corner, order something warm. The rest takes care of itself.',
    image: 'coffee',
  },
  {
    id: 'p2',
    kicker: 'Morning ritual',
    title: 'Coffee, first thing.',
    copy: 'Steam, foam and that first slow sip. Sessions start here.',
    image: 'coffee',
  },
  {
    id: 'p3',
    kicker: 'Hot off the griddle',
    title: 'Golden and grilled.',
    copy: 'Pressed, toasted and served warm — the way a sandwich should be.',
    image: 'sandwich',
  },
  {
    id: 'p4',
    kicker: 'Soft corners',
    title: 'Find your spot.',
    copy: 'A window seat, a long table, a quiet corner. Take your pick.',
    image: 'interior',
  },
  {
    id: 'p5',
    kicker: 'Save room',
    title: 'Commit to the cake.',
    copy: 'Because every good meal deserves a sweet ending.',
    image: 'dessert',
  },
  {
    id: 'p6',
    kicker: '& a spoon to steal',
    title: 'THIS WAY DOWN.',
    copy: 'Come hungry, leave happy. We saved you a seat.',
    image: 'coffee',
  },
]

function PanelBlock({ panel }: { panel: Panel }) {
  const isEnd = panel.id === 'p6'
  return (
    <div className="relative shrink-0 snap-center">
      <div className={`relative ${isEnd ? 'flex h-[24rem] w-[78vw] items-end justify-center md:h-[30rem] md:w-[38vw]' : 'h-[24rem] w-[78vw] md:h-[30rem] md:w-[42vw]'}`}>
        <p className="absolute -top-8 left-0 text-[0.625rem] font-bold uppercase tracking-[0.24em] text-terracotta">
          {panel.kicker}
        </p>
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-paper">
          <CafeImage src={panel.image} alt={panel.title} />
        </div>
        <div className="absolute inset-x-0 bottom-0 rounded-b-[1.75rem] bg-gradient-to-t from-espresso/85 via-espresso/35 to-transparent p-6 pt-24">
          <p className="font-display text-2xl font-semibold leading-tight text-ivory md:text-3xl">
            {panel.title}
          </p>
          <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-cream/80 md:text-sm">
            {panel.copy}
          </p>
        </div>
      </div>
    </div>
  )
}

function TitlePanel() {
  return (
    <div className="w-[80vw] shrink-0 pr-6 md:w-[36vw]">
      <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-terracotta">
        The experience
      </p>
      <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-semibold">
        Step inside.
        <br />
        <span className="italic text-terracotta">It gets cozy.</span>
      </h2>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-coffee">
        A café is just a room — until it has warmth, music, good food and the right
        people. Scroll through a little of what happens in ours.
      </p>
      <div className="mt-8 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-espresso/50">
        Keep scrolling
        <span className="text-terracotta">→</span>
      </div>
    </div>
  )
}

function EndCap({ show3D }: { show3D: boolean }) {
  return (
    <div className="relative w-[80vw] shrink-0 md:w-[40vw]">
      <div className="relative grid h-[24rem] place-items-center md:h-[30rem]">
        {show3D && (
          <div className="absolute inset-0 grid place-items-center">
            <Suspense fallback={null}>
              <CoffeeCup3D className="h-full w-full" />
            </Suspense>
          </div>
        )}
      </div>
      <p className="text-center font-display text-2xl font-semibold italic text-espresso">
        “Your table is waiting.”
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta"
        >
          Book a seat in advance
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  const [range, setRange] = useState<[number, number]>([0, 0])
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const end = trackRef.current.scrollWidth - window.innerWidth
      setRange((prev) => (prev[1] === -end ? prev : [0, -end]))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const translateX = useTransform(scrollYProgress, [0, 1], range)

  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const panels = (
    <div
      ref={trackRef}
      className={
        reduced
          ? 'container-cafe flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 md:gap-10'
          : 'flex items-center gap-8 pr-[12vw] md:gap-12'
      }
    >
      <TitlePanel />
      {PANELS.slice(0, 5).map((panel) => (
        <PanelBlock key={panel.id} panel={panel} />
      ))}
      <EndCap show3D={isDesktop} />
    </div>
  )

  if (reduced) {
    return (
      <section className="py-24 md:py-32">
        <div className="overflow-hidden">
          <div className="pointer-events-none sticky top-0 z-10 h-0">
            <div className="mx-auto mt-4 h-px w-2/3 overflow-hidden bg-espresso/10">
              <div className="h-full w-1/3 bg-terracotta" />
            </div>
          </div>
          {panels}
        </div>
      </section>
    )
  }

  return (
    <section ref={wrap} className="relative" style={{ height: '330vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ x: translateX }} className="flex items-center will-change-transform">
          {panels}
        </motion.div>

        {/* Progress */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="container-cafe">
            <div className="h-px w-full overflow-hidden bg-espresso/10">
              <motion.div
                style={{ scaleX: progress }}
                className="h-full origin-left bg-terracotta"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}