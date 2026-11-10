import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Lightbox from './ui/Lightbox'
import Reveal, { EASE } from './ui/Reveal'
import { imageSize } from './ui/imageSizes'

const CATEGORIES = [
  { id: 'all', label: 'All Moments' },
  { id: 'dance', label: 'Classical Recital' },
  { id: 'tradition', label: 'Guru & Sacred Craft' },
  { id: 'life', label: 'Life & Second Life' }
]

const CATEGORY_TAG = { dance: 'Recital', tradition: 'Sacred Craft', life: 'Life & Miracle' }

export default function Gallery({ gallery }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = selectedCategory === 'all'
    ? gallery.items
    : gallery.items.filter((item) => item.category === selectedCategory)

  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filteredItems.length)

  return (
    <section id="gallery" className="section section--deep">
      <div className="container">
        <div className="gallery__head">
          <SectionHeading index="07" eyebrow={gallery.eyebrow} heading={gallery.heading} />
          <Reveal delay={0.1}>
            <p className="text-sand gallery__intro">
              Photographic milestones documenting Janani’s devotion to Bharatanatyam, her reverent training under her guru, and her triumphant journey through organ transplantation.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <LayoutGroup id="gallery-tabs">
            <div className="tabs" role="tablist" aria-label="Filter gallery">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`tabs__btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                    {isActive && (
                      <motion.span
                        layoutId="tab-underline"
                        className="tabs__underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <div className="masonry" key={selectedCategory}>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.file}
                className="masonry__item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
              >
                <button
                  className="tile"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View full image: ${item.caption}`}
                >
                  <img src={`/images/${item.file}`} alt={item.alt} loading="lazy" {...imageSize(item.file)} />
                  <span className="tile__shade" aria-hidden="true" />
                  <span className="tile__meta">
                    {item.category && <span className="tile__tag">{CATEGORY_TAG[item.category]}</span>}
                    <span className="tile__caption">{item.caption}</span>
                  </span>
                  <span className="tile__plus" aria-hidden="true"><Plus size={18} strokeWidth={1.5} /></span>
                </button>
              </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
