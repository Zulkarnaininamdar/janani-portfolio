import Lenis from 'lenis'

// One shared smooth-scroll instance (Lenis) for the whole site.
// Falls back to native scrolling when the visitor prefers reduced motion.
let lenis = null
let rafId = null

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  const raf = (time) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  }
}

const NAV_OFFSET = 70

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.6 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.8 })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/**
 * Freeze page scrolling (menus, lightbox, intro). Locks are counted, so one
 * component releasing its lock can't unfreeze the page under another's.
 */
let locks = 0
export function lockScroll(locked) {
  locks = Math.max(0, locks + (locked ? 1 : -1))
  const frozen = locks > 0
  if (lenis) {
    if (frozen) lenis.stop()
    else lenis.start()
  }
  document.body.style.overflow = frozen ? 'hidden' : ''
}
