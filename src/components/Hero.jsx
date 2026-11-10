import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ArchFrame from './ui/ArchFrame'
import { EASE } from './ui/Reveal'
import { scrollToSection } from '../lib/smooth'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: EASE }
})

function MaskLine({ children, delay, className }) {
  return (
    <span className={`hero__line ${className || ''}`}>
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ person, startDelay = 0 }) {
  const d = startDelay
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [first, ...rest] = person.name.split(' ')
  const marquee = [...person.roles, ...person.roles]

  return (
    <>
      <section id="hero" className="hero" ref={ref}>
        <svg className="hero__mandala" viewBox="0 0 400 400" aria-hidden="true">
          {[190, 160, 130, 100, 70, 40].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth={i % 2 ? 0.4 : 0.8} />
          ))}
          {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => (
            <line
              key={a}
              x1={200 + Math.cos((a * Math.PI) / 180) * 40}
              y1={200 + Math.sin((a * Math.PI) / 180) * 40}
              x2={200 + Math.cos((a * Math.PI) / 180) * 190}
              y2={200 + Math.sin((a * Math.PI) / 180) * 190}
              stroke="currentColor"
              strokeWidth="0.35"
            />
          ))}
        </svg>

        <div className="container hero__grid">
          <motion.div className="hero__text" style={{ y: textY, opacity: fade }}>
            <motion.div className="hero__kicker" {...rise(d + 0.3)}>
              <span className="hero__kicker-line" />
              <p className="eyebrow">{person.heroKicker}</p>
            </motion.div>

            <h1 className="hero__name">
              <MaskLine delay={d + 0.45}>{first}</MaskLine>
              <MaskLine delay={d + 0.58} className="hero__name-italic">{rest.join(' ')}</MaskLine>
            </h1>

            <motion.ul className="hero__roles" {...rise(d + 0.9)}>
              {person.roles.map((r) => <li key={r}>{r}</li>)}
            </motion.ul>

            <motion.p className="hero__tagline" {...rise(d + 1.05)}>
              &ldquo;{person.tagline}&rdquo;
            </motion.p>

            <motion.p className="hero__quote" {...rise(d + 1.15)}>
              {person.heroQuote}
            </motion.p>

            <motion.div className="hero__cta" {...rise(d + 1.3)}>
              <button className="btn btn--solid" onClick={() => scrollToSection('journey')}>
                Her Story <ArrowRight size={16} strokeWidth={1.5} className="btn__arrow" />
              </button>
              <button className="btn btn--ghost" onClick={() => scrollToSection('collaborate')}>
                Collaborate
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__image"
            style={{ y: imgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: d }}
          >
            <ArchFrame
              src={`/images/${person.heroImage}`}
              alt="Portrait of Janani Pradhaban in a red and teal saree"
              size={440}
              shape="arch"
              eager
              parallax={false}
              delay={d + 0.2}
            />
          </motion.div>
        </div>

        <motion.button
          className="hero__scroll"
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to About section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 1.8, duration: 1 }}
        >
          <span>Scroll</span>
          <span className="hero__scroll-track"><span /></span>
        </motion.button>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div className="marquee__group" key={k}>
              {marquee.map((r, i) => (
                <span key={i} className="marquee__item">
                  {r}
                  <svg viewBox="0 0 10 10" width="8" height="8"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="currentColor" /></svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
