import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '../../lib/smooth'
import { EASE } from './Reveal'

const R = 26

/** Floating back-to-top arrow with a ring that fills as you scroll down the page. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const ring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8))

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="to-top"
          className="to-top"
          onClick={() => scrollToTop()}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.5, ease: EASE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg className="to-top__ring" viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r={R} className="to-top__track" />
            <motion.circle
              cx="30"
              cy="30"
              r={R}
              className="to-top__fill"
              style={{ pathLength: ring }}
            />
          </svg>
          <span className="to-top__arrow" aria-hidden="true">
            <ArrowUp size={20} strokeWidth={1.75} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
