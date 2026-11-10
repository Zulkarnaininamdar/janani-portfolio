import { useState, useEffect, useRef } from 'react'
import { Play, Square, Volume2, VolumeX } from 'lucide-react'

const TALA_BEATS = [
  { n: 1, action: 'Clap (Thatte)', syllable: 'Tha', type: 'Laghu' },
  { n: 2, action: 'Little finger', syllable: 'Dhi', type: 'Laghu' },
  { n: 3, action: 'Ring finger', syllable: 'Thom', type: 'Laghu' },
  { n: 4, action: 'Middle finger', syllable: 'Nam', type: 'Laghu' },
  { n: 5, action: 'Clap (Thatte)', syllable: 'Tha', type: 'Dhrutam 1' },
  { n: 6, action: 'Wave (Veechu)', syllable: 'Ka', type: 'Dhrutam 1' },
  { n: 7, action: 'Clap (Thatte)', syllable: 'Dhi', type: 'Dhrutam 2' },
  { n: 8, action: 'Wave (Veechu)', syllable: 'Mi', type: 'Dhrutam 2' }
]

export default function TalaVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef(null)

  // Initialize Web Audio API on user interaction
  const playBellSound = (isFirstBeat) => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // High gentle bell chime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(isFirstBeat ? 880 : 587.33, ctx.currentTime) // A5 or D5
      osc.frequency.exponentialRampToValueAtTime(isFirstBeat ? 440 : 293.66, ctx.currentTime + 0.15)

      // Short decaying bell envelope
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } catch {
      // Audio fallback silent
    }
  }

  useEffect(() => {
    let intervalId = null
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentBeat((prev) => {
          const next = (prev + 1) % 8
          playBellSound(next === 0)
          return next
        })
      }, 720)
    } else {
      setCurrentBeat(0)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, soundEnabled])

  const togglePlay = () => {
    if (!isPlaying && soundEnabled && !audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch {
        // Audio fallback
      }
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="widget tala">
      <div className="widget__head">
        <div className="widget__intro">
          <span className="eyebrow">Interactive Classical Rhythm · Adi Tala</span>
          <h4 className="widget__title">The Pulse of Salangai: 8-Beat Rhythm Cycle</h4>
          <p className="widget__desc">
            Every step Janani dances is governed by Tala—the ancient Indian science of rhythm. Press Play to experience the 8-beat cycle (4 Laghu beats + 4 Dhrutam beats) that syncs her ankle bells with eternity.
          </p>
        </div>

        <div className="tala__controls">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Mute bell sound' : 'Enable bell sound'}
            title={soundEnabled ? 'Bell sound is ON' : 'Bell sound is OFF'}
            className={`icon-btn ${soundEnabled ? 'is-on' : ''}`}
          >
            {soundEnabled ? <Volume2 size={18} strokeWidth={1.5} /> : <VolumeX size={18} strokeWidth={1.5} />}
          </button>

          <button onClick={togglePlay} className={`btn ${isPlaying ? 'btn--ghost' : 'btn--solid'}`}>
            {isPlaying ? (
              <>
                <Square size={13} fill="currentColor" /> Stop Tala
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" /> Experience Rhythm
              </>
            )}
          </button>
        </div>
      </div>

      <div className="tala__beats">
        {TALA_BEATS.map((beat, index) => {
          const isActive = isPlaying && currentBeat === index
          const isSamam = index === 0
          return (
            <div
              key={beat.n}
              className={`beat ${isActive ? 'is-active' : ''} ${isSamam ? 'is-samam' : ''}`}
            >
              <span className="beat__n">Beat {beat.n}</span>
              <div className="beat__syl">{beat.syllable}</div>
              <span className="beat__action">{beat.action}</span>
            </div>
          )
        })}
      </div>

      <div className="tala__legend">
        <span><strong>Laghu (4 Beats):</strong> 1 Clap + 3 Counts</span>
        <span><strong>Dhrutam 1 (2 Beats):</strong> 1 Clap + 1 Wave</span>
        <span><strong>Dhrutam 2 (2 Beats):</strong> 1 Clap + 1 Wave</span>
      </div>
    </div>
  )
}
