import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem, RevealText } from './ui/Reveal'
import { ScrollText } from './ui/ScrollFx'

const LINKS = [
  { to: '/story', label: 'Read Her Full Story' },
  { to: '/speech', label: 'Her Awareness Speech' },
  { to: '/volunteer', label: 'Volunteer Statement' }
]

export default function Mission({ mission }) {
  return (
    <section id="mission" className="section section--dark mission">
      <div className="container">
        <div className="mission__head">
          <SectionHeading index="06" eyebrow={mission.eyebrow} heading={mission.heading} />
          <Reveal delay={0.1}>
            <p className="lead text-sand mission__intro">{mission.intro}</p>
          </Reveal>
        </div>

        {/* Headline */}
        <div className="block mission__headline">
          <p className="mission__big">
            <RevealText stagger={0.08}>{mission.headlineQuote}</RevealText>
          </p>
          <Reveal delay={0.3}>
            <p className="mission__personal">&ldquo;{mission.personalQuote}&rdquo;</p>
          </Reveal>
        </div>

        {/* Reasons */}
        <Stagger className="block reasons" stagger={0.1}>
          {mission.reasons.map((reason, i) => (
            <StaggerItem key={i} className="reason">
              <span className="reason__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="reason__title">{reason.title}</h3>
              <p className="reason__text">{reason.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Call to action */}
        <div className="block cta">
          <div className="cta__panel">
            <h3 className="sub-head">
              <RevealText>{mission.callToAction.heading}</RevealText>
            </h3>
            <Stagger as="ol" className="cta__steps">
              {mission.callToAction.steps.map((step, i) => (
                <StaggerItem as="li" key={i}>
                  <span className="cta__n">{i + 1}</span>
                  <span>{step}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="cta__closing">{mission.callToAction.closing}</p>
            </Reveal>
          </div>
        </div>

        {/* Message to the world */}
        <div className="block message">
          {mission.messageToTheWorld.map((line, i) => (
            <ScrollText key={i}>{line}</ScrollText>
          ))}
        </div>

        {/* Long-form */}
        <Stagger className="reading-links">
          {LINKS.map((l) => (
            <StaggerItem key={l.to}>
              <Link to={l.to} className="reading-link">
                <span>{l.label}</span>
                <ArrowUpRight size={20} strokeWidth={1.25} />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="disclaimer">{mission.disclaimer}</p>
        </Reveal>

        <Divider />
      </div>
    </section>
  )
}
