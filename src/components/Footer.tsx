import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { cafe } from '../data/cafe'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <div className="container-cafe py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Wordmark */}
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold tracking-tight">
              Classic Spoon
              <br />
              <span className="italic text-latte">Cafe.</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {cafe.tagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <p className="mb-5 text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-latte">
              Explore
            </p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-sm text-cream/80 hover:text-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-latte">
              Find us
            </p>
            <ul className="space-y-3.5 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <span>
                  {cafe.address.line1},
                  <br />
                  {cafe.address.line2},
                  <br />
                  {cafe.address.area}, {cafe.address.city}, {cafe.address.stateZip}
                </span>
              </li>
              <li>
                <a
                  href={cafe.phoneHref}
                  className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
                >
                  <Phone className="h-4 w-4 shrink-0 text-terracotta" />
                  {cafe.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-cream/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {cafe.name}. All rights reserved.
          </p>
          <p className="font-display italic">Brewed with care in Bhubaneswar.</p>
        </div>
      </div>
    </footer>
  )
}