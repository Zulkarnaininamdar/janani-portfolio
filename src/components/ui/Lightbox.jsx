import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from './Reveal'
import { lockScroll } from '../../lib/smooth'

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]
  const closeRef = useRef()
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  useEffect(() => {
    closeRef.current?.focus()
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handler)
    lockScroll(true)
    return () => {
      window.removeEventListener('keydown', handler)
      lockScroll(false)
    }
  }, [onClose, onNext, onPrev])

  const onTouchEndHandle = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) onNext()
    else if (distance < -minSwipeDistance) onPrev()
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Image: ${item.caption}`}
      className="lightbox"
      onClick={onClose}
      onTouchStart={(e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={onTouchEndHandle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button ref={closeRef} onClick={onClose} aria-label="Close lightbox" className="lightbox__btn lightbox__close">
        <X size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        className="lightbox__btn lightbox__prev"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </button>

      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.file}
            className="lightbox__figure"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img src={`/images/${item.file}`} alt={item.alt} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </motion.figure>
        </AnimatePresence>
        <div className="lightbox__meta">
          <span>{index + 1} of {items.length}</span>
          <span>·</span>
          <span>Swipe or use arrow keys</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
        className="lightbox__btn lightbox__next"
      >
        <ChevronRight size={22} strokeWidth={1.5} />
      </button>
    </motion.div>
  )
}
