import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CafeImage from '../CafeImage'
import ScrollReveal from '../ScrollReveal'

const EASE = [0.22, 1, 0.36, 1] as const
const WORDS = ['MORE', 'THAN', 'JUST', 'A', 'CUP', 'OF', 'COFFEE.']

export default function Intro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.08])

  return (
    <section ref={ref} className="container-cafe relative py-24 md:py-36">
      <div className="grid items-start gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        {/* Text */}
        <div className="sticky top-32">
          <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-terracotta">
            Our story
          </p>

          <h2 className="mb-6 max-w-lg font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-semibold">
            {WORDS.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: 0.06 * i, ease: EASE }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <ScrollReveal delay={0.4}>
            <p className="max-w-md text-sm leading-[1.7] text-coffee md:text-base">
              Classic Spoon Cafe is a place to slow down, grab something delicious and
              spend a little time doing absolutely nothing — or everything. A good seat,
              a warm cup, an unhurried bite. We built this café for people who believe
              the best conversations happen over food.
            </p>
          </ScrollReveal>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-paper">
            <motion.div style={{ scale: imgScale }}>
              <CafeImage src="interior" alt="Inside Classic Spoon Cafe" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
            className="mt-6 flex items-center gap-4 border-t border-espresso/10 pt-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terracotta text-ivory">
              ☕
            </span>
            <p className="text-sm leading-snug text-coffee">
              <strong className="text-espresso">Coffee first.</strong> Everything else
              can wait.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}