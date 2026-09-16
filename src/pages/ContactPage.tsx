import { useState } from 'react'
import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import ScrollReveal from '../components/ScrollReveal'
import { cafe } from '../data/cafe'

function InfoCard({
  icon,
  label,
  value,
  action,
}: {
  icon: JSX.Element
  label: string
  value: string
  action?: string | undefined
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-espresso/8 bg-ivory/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_32px_-22px_rgba(43,29,20,0.25)]">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-terracotta/12 text-terracotta">
        {icon}
      </span>
      <div>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-terracotta">
          {label}
        </p>
        {action ? (
          <a
            href={action}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-display text-lg font-semibold text-espresso transition-colors hover:text-terracotta"
          >
            {value}
          </a>
        ) : (
          <p className="mt-2 font-display text-lg font-semibold text-espresso">{value}</p>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = [
      message,
      `Name: ${name}`,
      `Phone: ${phone}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(cafe.whatsappMessageHref(text || 'Hi, I had a question.'), '_blank')
  }

  return (
    <PageTransition>
      <Seo
        title="Contact | Classic Spoon Cafe"
        description="Get in touch with Classic Spoon Cafe — call, visit or send a WhatsApp from Gothapatna Road, Bhubaneswar."
      />

      {/* Header */}
      <header className="container-cafe pt-36 pb-10 md:pt-44">
        <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-terracotta">
          Contact
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] font-semibold tracking-tight">
          Come say{' '}
          <span className="italic text-terracotta">hello.</span>
        </h1>
      </header>

      {/* Info cards */}
      <section className="container-cafe grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <ScrollReveal>
          <InfoCard
            icon={<Phone className="h-5 w-5" />}
            label="Call"
            value={cafe.phone}
            action={cafe.phoneHref}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <InfoCard
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="Send a message"
            action={cafe.whatsappMessageHref('Hi Classic Spoon Cafe!')}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            label="Location"
            value={`${cafe.address.area}, ${cafe.address.city}`}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <InfoCard
            icon={<Navigation className="h-5 w-5" />}
            label="Directions"
            value="Open in Maps"
            action={cafe.mapsDirectionsUrl}
          />
        </ScrollReveal>
      </section>

      {/* Map + Form */}
      <section className="container-cafe grid gap-8 py-16 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
        {/* Map */}
        <ScrollReveal className="order-2 lg:order-1">
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

        {/* Form */}
        <ScrollReveal delay={0.12} className="order-1 lg:order-2">
          <h2 className="mb-2 font-display text-2xl font-semibold">Drop us a note</h2>
          <p className="mb-8 text-sm leading-relaxed text-coffee">
            We'll get back to you quickly via WhatsApp.
          </p>

          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-coffee"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-espresso/15 bg-ivory/60 px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-coffee"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-espresso/15 bg-ivory/60 px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="contact-msg"
                className="mb-1.5 block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-coffee"
              >
                Message
              </label>
              <textarea
                id="contact-msg"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-espresso/15 bg-ivory/60 px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-7 py-3.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-clay"
            >
              Send via WhatsApp
            </button>
          </form>
        </ScrollReveal>
      </section>
    </PageTransition>
  )
}