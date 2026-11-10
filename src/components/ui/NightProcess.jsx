import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { EASE } from './Reveal'

/**
 * Scroll-driven process for "The Night That Changed Everything".
 * Desktop: a pinned panel shows the current time while the steps scroll past;
 * a gold line draws down the steps and each one lights up as it reaches the
 * middle of the screen. Mobile: the same line + highlight in one column.
 */
export default function NightProcess({ steps }) {
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // The step crossing the middle band of the viewport becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 }
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [steps.length])

  const current = steps[active]
  const total = String(steps.length).padStart(2, '0')

  return (
    <div className="np">
      {/* Pinned panel (desktop) */}
      <aside className="np__aside" aria-hidden="true">
        <div className="np__count">
          <span className="np__count-now">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {String(active + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="np__count-sep" />
          <span className="np__count-total">{total}</span>
        </div>

        <div className="np__time">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-105%', opacity: 0 }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              {current.time}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="np__title">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {current.title}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="np__segments" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((_, i) => (
            <span key={i} className={i <= active ? 'is-on' : ''} />
          ))}
        </div>
      </aside>

      {/* Steps */}
      <ol className="np__list" ref={listRef}>
        <span className="np__rail" aria-hidden="true">
          <motion.span className="np__rail-fill" style={{ scaleY: fill }} />
        </span>

        {steps.map((step, i) => {
          const state = i === active ? 'is-active' : i < active ? 'is-past' : ''
          return (
            <li
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              data-index={i}
              className={`np__step ${state}`}
            >
              <span className="np__dot" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.div
                className="np__body"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <span className="np__step-time">{step.time}</span>
                <h3 className="np__step-title">{step.title}</h3>
                <p className="np__step-text">{step.text}</p>
              </motion.div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
