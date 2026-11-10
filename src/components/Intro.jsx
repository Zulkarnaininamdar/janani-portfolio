import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './ui/Reveal'
import { lockScroll } from '../lib/smooth'

export const INTRO_DURATION = 2.4 // seconds until the curtain has lifted

/** Opening curtain: name rises letter by letter, a gold line draws, then the panel lifts. */
export default function Intro({ name, kicker, onDone }) {
  useEffect(() => {
    let held = true
    lockScroll(true)
    const release = () => { if (held) { held = false; lockScroll(false) } }
    const t = setTimeout(() => { release(); onDone() }, INTRO_DURATION * 1000)
    return () => { clearTimeout(t); release() }
  }, [onDone])

  const letters = Array.from(name)

  return (
    <motion.div
      className="intro"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 1.1, delay: INTRO_DURATION - 1.1, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="intro__inner"
        animate={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, delay: INTRO_DURATION - 1.2, ease: EASE }}
      >
        <motion.img
          className="intro__mark"
          src="/images/brand/mark-320.png"
          alt=""
          width="320"
          height="320"
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <p className="intro__name">
          {letters.map((ch, i) => (
            <span key={i} className="intro__mask">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.035, ease: EASE }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </p>
        <motion.span
          className="intro__line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.p
          className="intro__kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {kicker}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
