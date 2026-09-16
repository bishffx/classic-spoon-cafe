import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Armchair, Coffee, MessageCircle, Sparkles, UtensilsCrossed } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import CafeImage from '../components/CafeImage'
import Marquee from '../components/Marquee'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { cafe } from '../data/cafe'

const VALUES: Array<{ title: string; copy: string; icon: JSX.Element }> = [
  {
    title: 'COFFEE',
    copy: 'Slow-brewed, properly pulled, always fresh. The engine of every good visit.',
    icon: <Coffee className="h-5 w-5" />,
  },
  {
    title: 'FOOD',
    copy: 'Comfortable plates with real flavour — grilled, tossed, melted and made to order.',
    icon: <UtensilsCrossed className="h-5 w-5" />,
  },
  {
    title: 'COMFORT',
    copy: 'Soft corners, warm light and a seat that fits. Stay as long as you like.',
    icon: <Armchair className="h-5 w-5" />,
  },
  {
    title: 'CONVERSATION',
    copy: 'The table is the loudest part of the room. We like it that way.',
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: 'GOOD VIBES',
    copy: 'Easy music, friendlier faces, no hurry. Big-city pace stops at the door.',
    icon: <Sparkles className="h-5 w-5" />,
  },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <Seo
        title="About | Classic Spoon Cafe"
        description="Meet Classic Spoon Cafe in Bhubaneswar — a cozy café for coffee, comfort food, casual conversations and good vibes."
      />

      {/* Header */}
      <header className="container-cafe pt-36 pb-10 md:pt-44">
        <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-terracotta">
          About the cafe
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] font-semibold tracking-tight">
          This is{' '}
          <span className="italic text-terracotta">Classic Spoon</span>.
        </h1>
      </header>

      {/* Editorial intro */}
      <section className="container-cafe grid gap-10 py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[2rem] bg-paper">
            <CafeImage src="interior" alt="Seating at Classic Spoon Cafe" />
          </div>
        </ScrollReveal>

        <div className="md:pt-6">
          <p className="font-display text-xl italic leading-relaxed text-espresso md:text-2xl">
            It started with a simple idea — a local café where the coffee is serious
            and everything else is not.
          </p>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 space-y-5 text-[0.9375rem] leading-[1.8] text-coffee">
              <p>
                Classic Spoon Cafe sits on Gothapatna Road, across from Suradas Market
                Complex in Nuagan, Bhubaneswar. It is the kind of place people find
                once and then keep coming back to — for the food, the coffee and the
                unhurried feeling of being somewhere that understands you.
              </p>
              <p>
                Our kitchen is built around comfort. Think crisp fries, golden grilled
                sandwiches, pastas with serious cream, and desserts worth saving room
                for. Our bar is built around ritual — chai that's brewed the long way,
                and coffee treated properly from bean to cup.
              </p>
              <p>
                But mostly, Classic Spoon is a room full of good conversations.
                Students with textbooks, friends catching up, dates that start shy and
                end loud, regulars who don't need to order anymore. Everyone gets a
                good spoonful.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image band */}
      <div className="grid gap-4 px-6 md:grid-cols-2 md:gap-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
            <CafeImage src="coffee" alt="A coffee being poured" />
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:gap-6">
          <ScrollReveal delay={0.1}>
            <div className="aspect-[16/7] overflow-hidden rounded-2xl bg-paper">
              <CafeImage src="snack" alt="Masala fries" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="aspect-[16/7] overflow-hidden rounded-2xl bg-paper">
              <CafeImage src="dessert" alt="Dessert at Classic Spoon" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Values */}
      <section className="container-cafe py-24 md:py-32">
        <SectionHeading
          eyebrow="What we're about"
          title="Five things on the menu, always."
          align="center"
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-espresso/15 pt-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta/12 text-terracotta" aria-hidden="true">
                {value.icon}
              </span>
              <p className="mt-4 font-display text-xl font-semibold">{value.title}</p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-coffee">{value.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marquee quote */}
      <Marquee text={cafe.tagline} className="py-6" />

      {/* CTA */}
      <section className="container-cafe py-20 text-center md:py-28">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-semibold leading-tight">
            Come find your table.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-coffee">
            The coffee's hot, the fries are fresh and there's a seat with your name on
            it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta"
            >
              Visit Us
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2.5 rounded-full border border-espresso/20 px-7 py-3.5 text-[0.8125rem] font-semibold text-espresso transition-colors hover:border-espresso/60"
            >
              See the menu
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  )
}