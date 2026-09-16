import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cafe } from '../data/cafe'
import { cn } from '../lib/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Classic Spoon Cafe home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-ivory">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M8 6 V16 a3 3 0 0 0 3 3 h4 a3 3 0 0 0 3 -3 V6"
            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          />
          <path
            d="M8 10 h8 M13 9 a3 3 0 0 0 3 3"
            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight">
          Classic Spoon
        </span>
        <span className="block text-[0.5625rem] font-bold uppercase tracking-[0.3em] text-terracotta">
          Café
        </span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory/85 backdrop-blur-md border-b border-espresso/5 shadow-[0_1px_20px_rgba(43,29,20,0.06)]'
          : 'bg-transparent',
      )}
    >
      <nav className="container-cafe flex h-[4.25rem] items-center justify-between md:h-[4.75rem]">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'link-underline text-[0.8125rem] font-semibold tracking-wide transition-colors',
                    isActive ? 'text-terracotta' : 'text-espresso/80 hover:text-espresso',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden rounded-full bg-espresso px-5 py-2.5 text-[0.8125rem] font-semibold text-ivory transition-colors hover:bg-terracotta md:inline-flex"
          >
            Visit Us
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15 bg-ivory/60 text-espresso md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[4.25rem] z-40 flex flex-col justify-between bg-cream px-6 pb-10 pt-8 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-espresso/8 py-4"
                >
                  <NavLink to={link.to} className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.6875rem] text-terracotta">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl font-semibold">{link.label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="space-y-1.5 text-sm text-coffee"
            >
              <p>{cafe.phone}</p>
              <p>{cafe.address.area}, {cafe.address.city}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}