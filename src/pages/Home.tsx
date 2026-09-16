import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import FeaturedMenu from '../components/sections/FeaturedMenu'
import FoodShowcase from '../components/sections/FoodShowcase'
import Experience from '../components/sections/Experience'
import TasteAI from '../components/TasteAI'
import SectionHeading from '../components/SectionHeading'
import GalleryPreview from '../components/sections/GalleryPreview'
import Location from '../components/sections/Location'

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title="Classic Spoon Cafe | Coffee, Food & Good Times in Bhubaneswar"
        description="Discover Classic Spoon Cafe in Bhubaneswar — a cozy destination for coffee, food, conversations and good times."
      />

      <Hero />
      <Intro />
      <FeaturedMenu />
      <FoodShowcase />
      <Experience />

      {/* Taste AI */}
      <section className="container-cafe py-24 md:py-32">
        <SectionHeading
          eyebrow="Taste AI"
          title="Decisions, made delicious."
          intro="Tell us your mood. We'll find the dish that matches it — powered by the crowd's cravings, in-house knowledge and a little taste intuition."
        />
        <TasteAI />
      </section>

      <GalleryPreview />
      <Location />
    </PageTransition>
  )
}