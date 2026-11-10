import { useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Reveal'
import { imageSize } from './imageSizes'
import { useParallax } from './ScrollFx'

/**
 * Photo frame with an offset gold outline, a curtain reveal on scroll and a gentle
 * parallax drift. shape="arch" gives a temple-arch top (portrait images only).
 * Images are never cropped: they keep their natural aspect ratio.
 *
 * The in-view trigger lives on the (unclipped) wrapper: browsers treat a fully
 * clip-pathed element as invisible, so it could never trigger itself.
 */
const mediaVariants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }
  })
}
const imgVariants = {
  hidden: { scale: 1.2 },
  show: (delay = 0) => ({ scale: 1, transition: { duration: 2, delay, ease: EASE } })
}

export default function ArchFrame({
  src,
  alt,
  size = 420,
  className = '',
  light = false,
  caption = null,
  shape = 'rect',
  eager = false,
  parallax = true,
  delay = 0
}) {
  const ref = useRef(null)
  const y = useParallax(ref, parallax ? 36 : 0)

  return (
    <motion.figure
      ref={ref}
      className={`frame frame--${shape} ${light ? 'frame--light' : ''} ${className}`}
      style={{ maxWidth: typeof size === 'number' ? `${size}px` : size, y }}
    >
      <motion.div
        className="frame__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        custom={delay}
      >
        <motion.div className="frame__media" variants={mediaVariants} custom={delay}>
          <motion.img
            src={src}
            alt={alt}
            {...imageSize(src)}
            loading={eager ? 'eager' : 'lazy'}
            variants={imgVariants}
            custom={delay}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <motion.figcaption
          className="frame__caption"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.6, ease: EASE }}
        >
          {caption}
        </motion.figcaption>
      )}
    </motion.figure>
  )
}
