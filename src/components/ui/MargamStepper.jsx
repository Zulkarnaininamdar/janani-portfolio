import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const MARGAM_STEPS = [
  {
    n: 1,
    name: 'Alarippu',
    translation: 'The Sacred Flowering',
    tempo: 'Vilamba to Druta',
    role: 'Pure rhythmic invocation. Neck, eye, and shoulder movements unfold rhythmically like the opening of temple lotus petals.',
    lifeReflection: 'Like the blossoming of a flower, her artistic debut began at age four with pure delight and boundless promise.'
  },
  {
    n: 2,
    name: 'Jatiswaram',
    translation: 'Rhythm Bound to Swaras',
    tempo: 'Madhyama (Medium)',
    role: 'A brilliant exposition of pure Nritta (dance geometry) set to melodic sol-fa syllables without lyrical words.',
    lifeReflection: 'Rigorous childhood training, synchronizing footwork, rhythm, and devotion under her guru’s careful guidance.'
  },
  {
    n: 3,
    name: 'Shabdam',
    translation: 'The First Words of Song',
    tempo: 'Gentle & Devotional',
    role: 'The first introduction of Abhinaya (expression) and spoken lyrics, singing hymns of adoration to the divine.',
    lifeReflection: 'Taking the public stage at her Salangai Pujai (age 13) and Arangetram (age 16), finding her true artistic voice.'
  },
  {
    n: 4,
    name: 'Varnam',
    translation: 'The Crown Jewel of Margam',
    tempo: 'Complex Multi-speed Tala',
    role: 'The most demanding centerpiece of the recital, demanding peak stamina, intricate Jatis, and intense emotional depth.',
    lifeReflection: 'Her life’s greatest test: enduring five years on the transplant waitlist and 12 hours of surgery with unshakeable fortitude.'
  },
  {
    n: 5,
    name: 'Padam',
    translation: 'The Soul of Expressive Abhinaya',
    tempo: 'Vilamba (Slow, Deeply Emotional)',
    role: 'Poetic songs of divine longing, deep empathy, and subtle facial nuances where time seems to stand still.',
    lifeReflection: 'The sacred, quiet gratitude held for her anonymous donor, honouring the gift of life with every breath.'
  },
  {
    n: 6,
    name: 'Tillana',
    translation: 'The Exuberant Rhythmic Finale',
    tempo: 'Druta (Fast, Joyous)',
    role: 'A breathless celebration of rhythm, breathtaking sculptural poses, and soaring joy that enchants the audience.',
    lifeReflection: 'The exhilarating triumph of returning to dance after transplant and celebrating the blessing of motherhood.'
  },
  {
    n: 7,
    name: 'Mangalam',
    translation: 'The Benediction of Blessings',
    tempo: 'Slow Reverent Prayer',
    role: 'The concluding salutation bowing to the Lord of Dance, the orchestra, the guru, and the assembled gathering.',
    lifeReflection: 'Janani’s lifelong mission: dedicating her voice to Mohan Foundation, raising organ donation awareness: “Please save lives.”'
  }
]

export default function MargamStepper({ margam }) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = MARGAM_STEPS[currentStep]

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % MARGAM_STEPS.length)
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + MARGAM_STEPS.length) % MARGAM_STEPS.length)

  return (
    <div className="margam">
      <div className="widget-head-center">
        <h3 className="sub-head">{margam.heading || 'A Recital in Seven Movements'}</h3>
        <p className="widget__desc">{margam.intro}</p>
      </div>

      <div className="margam__track-wrap">
        <div className="margam__track">
          <span className="margam__rail" aria-hidden="true" />
          <span
            className="margam__rail-fill"
            aria-hidden="true"
            style={{ transform: `scaleX(${currentStep / (MARGAM_STEPS.length - 1)})` }}
          />
          {MARGAM_STEPS.map((s, idx) => (
            <button
              key={s.n}
              onClick={() => setCurrentStep(idx)}
              aria-label={`Step ${s.n}: ${s.name}`}
              aria-current={idx === currentStep ? 'step' : undefined}
              className={`margam__node ${idx === currentStep ? 'is-active' : ''} ${idx < currentStep ? 'is-done' : ''}`}
            >
              <span className="margam__node-dot">{s.n}</span>
              <span className="margam__node-name">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.n}
          className="margam__card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="margam__card-head">
            <span className="margam__big-n" aria-hidden="true">{String(step.n).padStart(2, '0')}</span>
            <div className="margam__names">
              <h4 className="margam__name">{step.name}</h4>
              <span className="margam__translation">{step.translation}</span>
            </div>
            <span className="margam__tempo">{step.tempo}</span>
          </div>

          <p className="margam__role">{step.role}</p>

          <div className="margam__parallel">
            <span className="eyebrow">Artistic Parallel in Her Life</span>
            <p>&ldquo;{step.lifeReflection}&rdquo;</p>
          </div>

          <div className="margam__controls">
            <button onClick={prevStep} className="margam__ctrl">
              <ChevronLeft size={16} strokeWidth={1.5} /> Prev
            </button>
            <span className="margam__count">Movement {step.n} of 7</span>
            <button onClick={nextStep} className="margam__ctrl margam__ctrl--next">
              Next <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="margam__note">{margam.note}</p>
    </div>
  )
}
