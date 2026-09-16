import { MapPin, Navigation, Phone } from 'lucide-react'
import { cafe } from '../../data/cafe'
import SectionHeading from '../SectionHeading'
import ScrollReveal from '../ScrollReveal'

export default function Location() {
  return (
    <section className="container-cafe py-24 md:py-32">
      <SectionHeading
        eyebrow="Find us"
        title="Come by."
        intro="Easy to find on Gothapatna Road, right in front of Suradas Market Complex."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <ScrollReveal className="flex flex-col justify-between gap-10">
          <div className="space-y-7">
            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terracotta/12 text-terracotta">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                  Address
                </p>
                <address className="not-italic leading-relaxed text-espresso">
                  {cafe.address.line1},
                  <br />
                  {cafe.address.line2},
                  <br />
                  {cafe.address.area}, {cafe.address.city},
                  <br />
                  {cafe.address.stateZip}, {cafe.address.country}
                </address>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terracotta/12 text-terracotta">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                  Call us
                </p>
                <a
                  href={cafe.phoneHref}
                  className="link-underline text-lg font-display font-semibold text-espresso"
                >
                  {cafe.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={cafe.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta"
            >
              <Navigation className="h-4 w-4" />
              Get directions
            </a>
            <a
              href={cafe.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-espresso/20 px-7 py-3.5 text-[0.8125rem] font-semibold text-espresso transition-colors hover:border-espresso/60"
            >
              Call us
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative h-[20rem] overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-paper md:h-[26rem]">
            <iframe
              src={cafe.mapsEmbedUrl}
              title="Classic Spoon Cafe location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
              style={{ filter: 'sepia(0.25) grayscale(0.15) contrast(1.03)' }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}