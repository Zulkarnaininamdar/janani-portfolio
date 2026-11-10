import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAVARASA_DATA = [
  {
    id: 'shringara',
    rasa: 'Shringara',
    devanagari: 'शृङ्गार',
    meaning: 'Love & Devotion',
    color: '#D4738C',
    colorName: 'Syama / Rosy Amber',
    deity: 'Vishnu',
    biographyReflection: 'Her childhood love for Bharatanatyam sparked at age four, becoming a sacred devotion to the dance that no adversity could extinguish.'
  },
  {
    id: 'hasya',
    rasa: 'Hasya',
    devanagari: 'हास्य',
    meaning: 'Joy & Mirth',
    color: '#E6B800',
    colorName: 'Sita / Golden Light',
    deity: 'Pramatha',
    biographyReflection: 'The radiant smile on stage, the laughter she shares teaching her students, and the pure happiness of watching her son grow.'
  },
  {
    id: 'karuna',
    rasa: 'Karuna',
    devanagari: 'करुणा',
    meaning: 'Compassion & Mercy',
    color: '#A89F91',
    colorName: 'Kapota / Dove Grey',
    deity: 'Yama',
    biographyReflection: 'The supreme grace of the donor and their family, who in their darkest hour of grief showed divine mercy to give Janani a second life.'
  },
  {
    id: 'raudra',
    rasa: 'Raudra',
    devanagari: 'रौद्र',
    meaning: 'Fierce Will & Trial',
    color: '#C7382B',
    colorName: 'Rakta / Crimson Fire',
    deity: 'Rudra (Shiva)',
    biographyReflection: 'The fierce internal battle against failing health, refusing to surrender hope through five painful years on the transplant waiting list.'
  },
  {
    id: 'veera',
    rasa: 'Veera',
    devanagari: 'वीर',
    meaning: 'Courage & Heroism',
    color: '#E09943',
    colorName: 'Gaura / Saffron',
    deity: 'Indra',
    biographyReflection: 'Bravery entering the 12-hour surgery, enduring intensive care, rebuilding muscles from zero, and stepping boldly back onto stage.'
  },
  {
    id: 'bhayanaka',
    rasa: 'Bhayanaka',
    devanagari: 'भयानक',
    meaning: 'Fear & Fragility',
    color: '#4A3B4E',
    colorName: 'Krsna / Midnight Ink',
    deity: 'Kala',
    biographyReflection: 'The chill of the diagnosis at age 13 when her health collapsed and the doctors laid bare the grave risks of surgery.'
  },
  {
    id: 'bibhatsa',
    rasa: 'Bibhatsa',
    devanagari: 'बीभत्स',
    meaning: 'Ordeal & Aversion',
    color: '#5E6B5A',
    colorName: 'Nila / Shadowed Earth',
    deity: 'Mahakala',
    biographyReflection: 'The harsh physical decline before surgery—darkened skin, loss of hair, and physical exhaustion—transformed through resilience.'
  },
  {
    id: 'adbhuta',
    rasa: 'Adbhuta',
    devanagari: 'अद्भुत',
    meaning: 'Wonder & Miracle',
    color: '#D4AF37',
    colorName: 'Pita / Luminous Gold',
    deity: 'Brahma',
    biographyReflection: 'The true miracle in the year after transplant: welcoming her healthy son on 28 September 2017 and dancing once again.'
  },
  {
    id: 'shanta',
    rasa: 'Shanta',
    devanagari: 'शान्त',
    meaning: 'Peace & Transcendence',
    color: '#FAF5EB',
    colorName: 'Sveta / Pristine Ivory',
    deity: 'Para-Brahman',
    biographyReflection: 'The profound inner peace found in folded hands before Lord Nataraja and living each day with deep gratitude and purpose.'
  }
]

export default function NavarasaExplorer({ heading }) {
  const [activeRasa, setActiveRasa] = useState(NAVARASA_DATA[0])

  return (
    <div className="navarasa">
      <div className="widget-head-center">
        <h3 className="sub-head">{heading || 'Navarasa: The Nine Emotions of Life & Stage'}</h3>
        <p className="widget__desc">
          In classical Bharatanatyam, the nine rasas mirror every facet of human experience. For Janani, these are not just stage emotions, but the lived chapters of her survival and art.
        </p>
      </div>

      <div className="navarasa__layout">
        <div className="navarasa__grid">
          {NAVARASA_DATA.map((item) => {
            const isSelected = activeRasa.id === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveRasa(item)}
                aria-label={`Select ${item.rasa}: ${item.meaning}`}
                aria-pressed={isSelected}
                className={`rasa ${isSelected ? 'is-active' : ''}`}
                style={{ '--rasa': item.color }}
              >
                <span className="rasa__dev">{item.devanagari}</span>
                <span className="rasa__name">{item.rasa}</span>
                <span className="rasa__meaning">{item.meaning}</span>
              </button>
            )
          })}
        </div>

        <div className="navarasa__detail-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRasa.id}
              className="navarasa__detail"
              style={{ '--rasa': activeRasa.color }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="navarasa__glyph" aria-hidden="true">{activeRasa.devanagari}</span>
              <span className="eyebrow">Classical Rasa &middot; {activeRasa.devanagari}</span>
              <h4 className="navarasa__title">
                {activeRasa.rasa} — <em>{activeRasa.meaning}</em>
              </h4>

              <dl className="navarasa__facts">
                <div>
                  <dt>Presiding Deity</dt>
                  <dd>{activeRasa.deity}</dd>
                </div>
                <div>
                  <dt>Natyashastra Hue</dt>
                  <dd><span className="navarasa__swatch" />{activeRasa.colorName}</dd>
                </div>
              </dl>

              <span className="eyebrow">Resonance in Janani&rsquo;s Life Journey</span>
              <p className="navarasa__text">&ldquo;{activeRasa.biographyReflection}&rdquo;</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
