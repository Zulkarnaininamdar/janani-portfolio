import { useCallback, useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import content from './content/content.json'
import Intro, { INTRO_DURATION } from './components/Intro'
import Nav from './components/Nav'
import ScrollProgress from './components/ui/ScrollProgress'
import BackToTop from './components/ui/BackToTop'
import Hero from './components/Hero'
import About from './components/About'
import TheArt from './components/TheArt'
import GuruAndCraft from './components/GuruAndCraft'
import Journey from './components/Journey'
import SecondLife from './components/SecondLife'
import Mission from './components/Mission'
import Gallery from './components/Gallery'
import Collaborate from './components/Collaborate'
import Footer from './components/Footer'
import FullStory from './pages/FullStory'
import AwarenessSpeech from './pages/AwarenessSpeech'
import VolunteerStatement from './pages/VolunteerStatement'
import { initSmoothScroll, scrollToTop } from './lib/smooth'

// Show the opening curtain once per browser session, and never to reduced-motion visitors.
function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem('jp-intro-seen')) return false
    sessionStorage.setItem('jp-intro-seen', '1')
  } catch {
    // storage unavailable: still show it
  }
  return true
}

// Decide once per page load (StrictMode runs state initialisers twice).
let introPending
function takeIntro() {
  if (introPending === undefined) introPending = shouldShowIntro()
  return introPending
}

function MainPage() {
  const [showIntro, setShowIntro] = useState(takeIntro)
  const [startDelay] = useState(() => (showIntro ? INTRO_DURATION - 0.6 : 0))
  const finishIntro = useCallback(() => { introPending = false; setShowIntro(false) }, [])

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <Intro
            key="intro"
            name={content.person.name}
            kicker={content.person.heroKicker}
            onDone={finishIntro}
          />
        )}
      </AnimatePresence>
      <ScrollProgress />
      <a href="#about" className="skip-link">Skip to content</a>
      <Nav nav={content.nav} personName={content.person.name} startDelay={startDelay} />
      <main>
        <Hero person={content.person} startDelay={startDelay} />
        <About about={content.about} />
        <TheArt art={content.art} />
        <GuruAndCraft data={content.guruAndCraft} />
        <Journey journey={content.journey} />
        <SecondLife data={content.secondLife} />
        <Mission mission={content.mission} />
        <Gallery gallery={content.gallery} />
        <Collaborate collaborate={content.collaborate} personName={content.person.name} />
      </main>
      <Footer footer={content.footer} contact={content.collaborate.contact} personName={content.person.name} />
    </>
  )
}

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { scrollToTop({ immediate: true }) }, [pathname])
  return null
}

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollReset />
        <BackToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/story" element={<FullStory />} />
          <Route path="/speech" element={<AwarenessSpeech />} />
          <Route path="/volunteer" element={<VolunteerStatement />} />
        </Routes>
      </HashRouter>
    </MotionConfig>
  )
}
