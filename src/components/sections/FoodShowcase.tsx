import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import CafeImage from '../CafeImage'
import Marquee from '../Marquee'
import ScrollReveal from '../ScrollReveal'

const EASE = [0.22, 1, 0.36, 1] as const

function CollageItem({
  src,
  alt,
  className,
  speed,
}: {
  src: 'coffee' | 'snack' | 'pasta' | 'dessert' | 'sandwich' | 'beverage'
  alt: string
  className: string
  speed: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-paper">
        <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105">
          <CafeImage src={src} alt={alt} />
        </div>
      </div>
    </motion.div>
  )
}

export default function FoodShowcase() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <Marquee text="COME HUNGRY." />

      <div className="container-cafe mt-12 md:mt-16">
        <ScrollReveal>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-coffee">
            Plates made to be photographed and then demolished. From crisp golden fries
            to creamy, twirl-able pasta — every table gets the full spread.
          </p>
        </ScrollReveal>

        <div
          className="relative mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12"
          style={{ paddingBottom: '4rem' }}
        >
          {/* Rotated accents */}
          <div className="pointer-events-none absolute right-[6%] top-0 -z-10 hidden select-none font-display text-[10rem] font-bold italic text-espresso/[0.04] lg:block">
            yum
          </div>

          <div className="col-span-2 lg:col-span-5">
            <div className="aspect-[4/5] md:aspect-[4/3]">
              <CollageItem
                src="snack"
                alt="Masala fries"
                className="h-full"
                speed={reduced ? 0 : 46}
              />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3 lg:mt-20">
            <div className="aspect-square">
              <CollageItem src="dessert" alt="Brownie dessert" className="h-full" speed={reduced ? 0 : 70} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 lg:mt-6">
            <div className="aspect-square lg:aspect-[3/4]">
              <CollageItem src="sandwich" alt="Grilled sandwich" className="h-full" speed={reduced ? 0 : 30} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 lg:-mt-6">
            <div className="aspect-square">
              <CollageItem src="pasta" alt="Creamy pasta" className="h-full" speed={reduced ? 0 : 60} />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-3 lg:mt-10">
            <div className="aspect-[5/4] lg:aspect-square">
              <CollageItem src="beverage" alt="Cold coffee" className="h-full" speed={reduced ? 0 : 40} />
            </div>
          </div>

          <div className="col-span-2 flex items-end justify-between lg:col-span-5">
            <div className="w-2/3">
              <div className="aspect-[6/5]">
                <CollageItem src="coffee" alt="A fresh pour" className="h-full" speed={reduced ? 0 : 20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <Marquee text="HOT · FRESH · EVERY DAY" reverse />
      </div>
    </section>
  )
}