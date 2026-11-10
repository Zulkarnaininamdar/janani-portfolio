import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate, useReducedMotion } from 'framer-motion'

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ children, className = '', as = 'p' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 50%'] })
  const Tag = as

  if (reduced || typeof children !== 'string') {
    return <Tag ref={ref} className={className}>{children}</Tag>
  }

  const words = children.split(' ')
  return (
    <Tag ref={ref} className={`scroll-text ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

/** Counts a leading number up from 0 when it enters view ("4", "13", "2×"). Other values render as-is. */
export function CountUp({ value }) {
  const str = String(value)
  const match = str.match(/^(\d+)([^A-Za-z]*)$/)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [n, setN] = useState(match && !reduced ? 0 : null)

  useEffect(() => {
    if (!match || reduced || !inView) return
    const target = parseInt(match[1], 10)
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v))
    })
    return () => controls.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match || n === null) return <span ref={ref}>{str}</span>
  return (
    <span ref={ref}>
      <span aria-hidden="true">{n}{match[2]}</span>
      <span className="sr-only">{str}</span>
    </span>
  )
}

/** Gentle vertical drift tied to scroll position. */
export function useParallax(ref, distance = 40) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [distance, -distance])
}

/** True when the media query matches (client only). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}
