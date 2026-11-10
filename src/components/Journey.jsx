import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem, EASE } from './ui/Reveal'
import { CountUp, useMediaQuery } from './ui/ScrollFx'

/* Desktop: the section pins and the life story slides sideways as you scroll. */
function HorizontalTimeline({ journey }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], [0, 1])

  return (
    <div ref={wrapRef} className="hz" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="hz__sticky">
        <motion.ol ref={trackRef} className="hz__track" style={{ x }}>
          <li className="hz__intro">
            <SectionHeading index="04" eyebrow={journey.eyebrow} heading={journey.heading} />
            <Reveal delay={0.2}>
              <p className="hz__hint">
                <span className="hz__hint-line" />
                Scroll
              </p>
            </Reveal>
          </li>
          {journey.timeline.map((item, i) => (
            <motion.li
              key={i}
              className="hz__card"
              initial={{ opacity: 0, x: 90 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <span className="hz__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="hz__dot" aria-hidden="true" />
              <span className="hz__label">{item.label}</span>
              <h3 className="hz__title">{item.title}</h3>
              <p className="hz__text">{item.text}</p>
            </motion.li>
          ))}
          <li className="hz__end" aria-hidden="true" />
        </motion.ol>

        <div className="hz__progress" aria-hidden="true">
          <motion.span style={{ scaleX: bar }} />
        </div>
      </div>
    </div>
  )
}

/* Mobile / reduced motion: classic vertical timeline that draws itself. */
function VerticalTimeline({ journey }) {
  const tlRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div className="container">
      <SectionHeading index="04" eyebrow={journey.eyebrow} heading={journey.heading} />
      <ol className="tl" ref={tlRef}>
        <span className="tl__spine" aria-hidden="true">
          <motion.span className="tl__spine-fill" style={{ scaleY: progress }} />
        </span>
        {journey.timeline.map((item, i) => (
          <li key={i} className="tl__item">
            <motion.span
              className="tl__dot"
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -35% 0px' }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <motion.div
              className="tl__card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="tl__label">{item.label}</span>
              <h3 className="tl__title">{item.title}</h3>
              <p className="tl__text">{item.text}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Journey({ journey }) {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const horizontal = wide && !reduced

  return (
    <section id="journey" className={`section section--deep journey ${horizontal ? 'journey--hz' : ''}`}>
      {horizontal ? <HorizontalTimeline journey={journey} /> : <VerticalTimeline journey={journey} />}

      <div className="container">
        <div className="block diagnosis">
          <h3 className="sub-head center">{journey.diagnosis.heading}</h3>

          <Stagger className="stats diagnosis__stats">
            {journey.diagnosis.stats.map((s, i) => (
              <StaggerItem key={i} className="stat">
                <div className="stat__value"><CountUp value={s.value} /></div>
                <div className="stat__label">{s.label}</div>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="diagnosis__cards" stagger={0.12}>
            {journey.diagnosis.cards.map((card, i) => (
              <StaggerItem key={i} className="d-card">
                <span className="d-card__n">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="d-card__title">{card.title}</h4>
                <p className="d-card__text">{card.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <blockquote className="pull-quote diagnosis__quote">
              <span className="pull-quote__mark" aria-hidden="true">&ldquo;</span>
              {journey.diagnosis.pullQuote}
            </blockquote>
          </Reveal>
        </div>

        <Divider />
      </div>
    </section>
  )
}
