import ArchFrame from './ui/ArchFrame'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem } from './ui/Reveal'
import { ScrollText, CountUp } from './ui/ScrollFx'

export default function About({ about }) {
  return (
    <section id="about" className="section section--light">
      <div className="container">
        <SectionHeading index="01" eyebrow={about.eyebrow} heading={about.heading} light />
        <ScrollText className="statement">{about.intro}</ScrollText>

        <div className="split split--top about block">
          <div className="split__media about__media">
            <ArchFrame src={`/images/${about.image}`} alt={about.imageAlt} size={360} shape="arch" light />
          </div>

          <div className="about__body">
            <Reveal>
              <p className="about__text about__text--first">{about.family}</p>
            </Reveal>

            <Stagger className="stats about__stats">
              {about.stats.map((s, i) => (
                <StaggerItem key={i} className="stat">
                  <div className="stat__value"><CountUp value={s.value} /></div>
                  <div className="stat__label">{s.label}</div>
                </StaggerItem>
              ))}
            </Stagger>

            {about.paragraphs.map((p, i) => (
              <Reveal key={i}>
                <p className="about__text">{p}</p>
              </Reveal>
            ))}

            <Reveal>
              <blockquote className="quote about__quote">&ldquo;{about.quote}&rdquo;</blockquote>
            </Reveal>
          </div>
        </div>
        <Divider />
      </div>
    </section>
  )
}
