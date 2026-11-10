import { motion } from 'framer-motion'
import { EASE } from './Reveal'

export default function Divider() {
  return (
    <div className="ornament" aria-hidden="true">
      <motion.span
        className="ornament__line"
        style={{ transformOrigin: 'right' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.svg
        width="26" height="26" viewBox="0 0 24 24" fill="none"
        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        <path d="M12 2C12 2 10 6 10 9C10 11.2 10.8 13 12 14C13.2 13 14 11.2 14 9C14 6 12 2 12 2Z" fill="currentColor" opacity="0.9" />
        <path d="M4 8C4 8 7 10 9 12C10.4 13.4 11 15 11 16C9.5 16 7.5 15 6 13.5C4 11.5 4 8 4 8Z" fill="currentColor" opacity="0.65" />
        <path d="M20 8C20 8 17 10 15 12C13.6 13.4 13 15 13 16C14.5 16 16.5 15 18 13.5C20 11.5 20 8 20 8Z" fill="currentColor" opacity="0.65" />
        <circle cx="12" cy="17" r="2" fill="currentColor" opacity="0.9" />
        <path d="M12 19C12 19 10 21 12 22C14 21 12 19 12 19Z" fill="currentColor" opacity="0.55" />
      </motion.svg>
      <motion.span
        className="ornament__line"
        style={{ transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </div>
  )
}
