import ArchFrame from './ui/ArchFrame'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem } from './ui/Reveal'
import NightProcess from './ui/NightProcess'

export default function SecondLife({ data }) {
  const { night, resilience, blessing, gratitude, seekingBlessings } = data

  return (
    <section id="second-life" className="section section--plum">
      <div className="container">

        {/* The night */}
        <SectionHeading index="05" eyebrow={night.eyebrow} heading={night.heading} />
        <NightProcess steps={night.steps} />

        {/* Resilience */}
        <div className="block split">
          <div className="split__media">
            <ArchFrame
              src={`/images/${resilience.image}`}
              alt={resilience.imageAlt}
              size={480}
              caption={resilience.imageCaption}
            />
          </div>
          <div>
            <SectionHeading eyebrow={resilience.eyebrow} heading={resilience.heading} small />
            <Stagger as="ol" className="steps">
              {resilience.steps.map((step, i) => (
                <StaggerItem as="li" key={i} className="steps__item">
                  <span className="steps__n">{step.n}</span>
                  <div>
                    <div className="steps__title">{step.title}</div>
                    <p className="steps__text">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* A gift for her son — Dr. Rela is NOT described as doctor/surgeon */}
        <div className="block split split--rev">
          <div className="split__media">
            <ArchFrame
              src={`/images/${blessing.image}`}
              alt={blessing.imageAlt}
              size={480}
              caption={blessing.caption}
            />
          </div>
          <div>
            <SectionHeading eyebrow={blessing.eyebrow} heading={blessing.heading} small />
            <Reveal>
              <p className="lead text-sand blessing__text">{blessing.text}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="quote">&ldquo;{blessing.quote}&rdquo;</blockquote>
            </Reveal>
          </div>
        </div>

        {/* Gratitude */}
        <div className="block split split--rev gratitude">
          <div className="split__media">
            <ArchFrame
              src={`/images/${seekingBlessings.image}`}
              alt={seekingBlessings.imageAlt}
              size={360}
              shape="arch"
              caption={seekingBlessings.caption}
            />
          </div>
          <div>
            <SectionHeading eyebrow={gratitude.eyebrow} heading={gratitude.heading} small />
            {gratitude.paragraphs.map((p, i) => (
              <Reveal key={i}>
                <p className="text-sand gratitude__p">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="quote gratitude__quote">&ldquo;{gratitude.quote}&rdquo;</blockquote>
            </Reveal>
          </div>
        </div>

        <Divider />
      </div>
    </section>
  )
}
