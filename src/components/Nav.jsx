import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE } from './ui/Reveal'
import { scrollToSection, scrollToTop, lockScroll } from '../lib/smooth'

export { scrollToSection }

const READING = [
  { to: '/story', label: 'Read Her Full Story' },
  { to: '/speech', label: 'Her Awareness Speech' },
  { to: '/volunteer', label: 'Volunteer Statement' }
]

export default function Nav({ nav, personName, startDelay = 0 }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setPastHero(y > window.innerHeight * 0.75)
    setHidden(y > 400 && y > prev && !open)
  })

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    )
    nav.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [nav])

  const lockedRef = useRef(false)
  const closeDrawer = useCallback(() => {
    setOpen(false)
    if (lockedRef.current) { lockedRef.current = false; lockScroll(false) }
  }, [])

  const openDrawer = () => {
    setOpen(true)
    if (!lockedRef.current) { lockedRef.current = true; lockScroll(true) }
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeDrawer() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  const go = (id) => {
    closeDrawer()
    setTimeout(() => scrollToSection(id), 80)
  }

  const [first, ...rest] = personName.split(' ')
  const activeIdx = nav.findIndex((n) => n.id === active)

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        aria-label="Primary navigation"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: hidden ? 0 : startDelay + 0.1 }}
      >
        <button
          className="nav__brand"
          onClick={() => scrollToTop()}
          aria-label="Back to top"
        >
          <img className="nav__mark" src="/images/brand/mark-160.png" alt="" width="54" height="54" />
          <span>{first} <em>{rest.join(' ')}</em></span>
        </button>

        <nav aria-label="Desktop Navigation" className="nav__links">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'page' : undefined}
                  className={active === item.id ? 'is-active' : ''}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav__underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="nav__menu"
          onClick={openDrawer}
          aria-label="Open right navigation sidebar"
          aria-expanded={open}
        >
          <span>Menu</span>
          <span className="nav__burger" aria-hidden="true"><i /><i /></span>
        </button>
      </motion.header>

      {/* Chapter marker (desktop) */}
      <div className={`chapter ${activeIdx >= 0 && pastHero ? 'is-visible' : ''}`} aria-hidden="true">
        <span className="chapter__num">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeIdx}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {String(Math.max(activeIdx, 0) + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="chapter__line" />
        <span className="chapter__label">{activeIdx >= 0 ? nav[activeIdx].label : ''}</span>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="drawer-backdrop"
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={closeDrawer}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              className="drawer"
              role="dialog"
              aria-label="Right navigation sidebar"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="drawer__head">
                <img className="drawer__mark" src="/images/brand/mark-160.png" alt="" width="64" height="64" />
                <div className="drawer__head-text">
                  <span className="eyebrow">Navigation</span>
                  <span className="drawer__name">{personName}</span>
                </div>
                <button className="drawer__close" onClick={closeDrawer} aria-label="Close sidebar">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <motion.nav
                aria-label="Sidebar Sections"
                className="drawer__nav"
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
              >
                <ul>
                  {nav.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, x: 40 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } }
                      }}
                    >
                      <button
                        onClick={() => go(item.id)}
                        className={active === item.id ? 'is-active' : ''}
                      >
                        <span className="drawer__idx">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="drawer__label">{item.label}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="drawer__reading"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
                  }}
                >
                  <span className="eyebrow">In-Depth Reading</span>
                  {READING.map((r) => (
                    <Link key={r.to} to={r.to} onClick={closeDrawer} className="drawer__link">
                      <span>{r.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </Link>
                  ))}
                </motion.div>
              </motion.nav>

              <div className="drawer__foot">
                <p>&ldquo;A gift of life can become a lifetime of hope.&rdquo;</p>
                <span>Bharatanatyam &middot; Organ Donation Awareness</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
