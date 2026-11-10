import ArchFrame from './ui/ArchFrame'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem, RevealText } from './ui/Reveal'
import NavarasaExplorer from './ui/NavarasaExplorer'
import MargamStepper from './ui/MargamStepper'
import TalaVisualizer from './ui/TalaVisualizer'

const ROMAN = ['I', 'II', 'III', 'IV']

export default function TheArt({ art }) {
  return (
    <section id="art" className="section section--dark art">
      <Reveal as="p" className="art__shloka" y={16}>
        <span lang="sa">यतो हस्तस्ततो दृष्टिर्यतो दृष्टिस्ततो मनः । यतो मनस्ततो भावो यतो भावस्ततो रसः ॥</span>
      </Reveal>

      <div className="container">
        <div className="art__head">
          <SectionHeading index="02" eyebrow={art.eyebrow} heading={art.heading} />
          <Reveal delay={0.1}>
            <p className="lead art__intro">
              For Janani, Bharatanatyam is more than a classical tradition—it was her childhood dream from age four, her spiritual anchor during five years on the transplant list, and the breath of her second life.
            </p>
          </Reveal>
        </div>

        {/* Nataraja + points */}
        <div className="split block">
          <div className="split__media">
            <ArchFrame
              src={`/images/${art.image}`}
              alt={art.imageAlt}
              size={360}
              shape="arch"
              caption={art.imageCaption}
            />
          </div>
          <Stagger as="ul" className="ticks">
            {art.points.map((pt, i) => (
              <StaggerItem as="li" key={i}>
                <span className="ticks__n">{String(i + 1).padStart(2, '0')}</span>
                <span>{pt}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="block">
          <Reveal>
            <TalaVisualizer />
          </Reveal>
        </div>

        {/* Bha-Ra-Ta-Natyam */}
        <div className="block">
          <Reveal>
            <p className="eyebrow name-reading__title">{art.nameReading.title}</p>
          </Reveal>
          <Stagger className="name-reading" stagger={0.12}>
            {art.nameReading.parts.map((part, i) => (
              <StaggerItem key={i} className="name-reading__part" y={40}>
                <div className="name-reading__syl">{part.syllable}</div>
                <div className="name-reading__meaning">{part.meaning}</div>
                <div className="name-reading__gloss">{part.gloss}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Nritta / Nritya / Natya */}
        <div className="block">
          <h3 className="sub-head center">
            <RevealText>{art.aspects.heading}</RevealText>
          </h3>
          <Stagger className="aspects" stagger={0.12}>
            {art.aspects.items.map((item, i) => (
              <StaggerItem key={i} className="aspect">
                <span className="aspect__num">{ROMAN[i]}</span>
                <h4 className="aspect__name">{item.name}</h4>
                <p className="aspect__text">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="block">
          <NavarasaExplorer heading={art.navarasa.heading} />
        </div>

        <div className="block">
          <MargamStepper margam={art.margam} />
        </div>

        <Divider />
      </div>
    </section>
  )
}
