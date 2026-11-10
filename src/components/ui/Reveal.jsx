import { motion } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]
const VIEWPORT = { once: true, amount: 0.12, margin: '0px 0px -8% 0px' }

/** Fade + rise into view. */
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', style }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Word-by-word masked reveal for headings. Falls back to plain children for non-strings. */
export function RevealText({ children, delay = 0, stagger = 0.06, animateOnMount = false }) {
  if (typeof children !== 'string') return children
  const words = children.split(' ')
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.4 } }
  return (
    <motion.span
      style={{ display: 'inline' }}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="mask-word">
            <motion.span
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 1.05, ease: EASE } }
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  )
}

/** Parent that staggers its <StaggerItem> children as it enters view. */
export function Stagger({ children, className = '', as = 'div', stagger = 0.08, delay = 0, style }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className = '', as = 'div', y = 24, style }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
      }}
    >
      {children}
    </Tag>
  )
}

/** A thin line that draws itself from the left. */
export function DrawLine({ className = '', delay = 0 }) {
  return (
    <motion.span
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE }}
      aria-hidden="true"
    />
  )
}
