import ArchFrame from './ui/ArchFrame'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem } from './ui/Reveal'

function Ticks({ items }) {
  return (
    <Stagger as="ul" className="ticks">
      {items.map((pt, i) => (
        <StaggerItem as="li" key={i}>
          <span className="ticks__n">{String(i + 1).padStart(2, '0')}</span>
          <span>{pt}</span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

export default function GuruAndCraft({ data }) {
  const { guru, prayer, backstage, costume, onStage } = data

  return (
    <section id="guru" className="section section--light">
      <div className="container">

        {/* Guru */}
        <div className="split">
          <div className="split__media guru__media">
            <ArchFrame src={`/images/${guru.image}`} alt={guru.imageAlt} size={520} light />
            <Reveal delay={0.3} className="guru__label">
              {guru.label}
            </Reveal>
          </div>
          <div>
            <SectionHeading index="03" eyebrow={guru.eyebrow} heading={guru.heading} light />
            <Reveal>
              <p className="lead text-plum">{guru.text}</p>
            </Reveal>
          </div>
        </div>

        {/* Prayer — wide image, full view */}
        <div className="block prayer">
          <div className="prayer__head">
            <SectionHeading eyebrow={prayer.eyebrow} heading={prayer.heading} light small />
          </div>
          <div className="prayer__grid">
            <ArchFrame
              src={`/images/${prayer.image}`}
              alt={prayer.imageAlt}
              size="100%"
              light
              caption={prayer.imageCaption}
            />
            <Ticks items={prayer.points} />
          </div>
        </div>

        {/* Backstage */}
        <div className="block split split--rev">
          <div className="split__media">
            <ArchFrame src={`/images/${backstage.image}`} alt={backstage.imageAlt} size={420} light />
          </div>
          <div>
            <SectionHeading eyebrow={backstage.eyebrow} heading={backstage.heading} light small />
            <Ticks items={backstage.points} />
          </div>
        </div>

        {/* Costume */}
        <div className="block split">
          <div className="split__media">
            <ArchFrame src={`/images/${costume.image}`} alt={costume.imageAlt} size={380} shape="arch" light />
          </div>
          <div>
            <SectionHeading eyebrow={costume.eyebrow} heading={costume.heading} light small />
            <Stagger as="ol" className="costume-list">
              {costume.items.map((item, i) => (
                <StaggerItem as="li" key={i}>
                  <span className="costume-list__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="costume-list__name">{item.name}</div>
                    <div className="costume-list__text">{item.text}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* On stage */}
        <div className="block split split--rev">
          <div className="split__media">
            <ArchFrame src={`/images/${onStage.image}`} alt={onStage.imageAlt} size={380} shape="arch" light />
          </div>
          <div>
            <SectionHeading eyebrow={onStage.eyebrow} heading={onStage.heading} light small />
            <Ticks items={onStage.points} />
            <Reveal>
              <blockquote className="quote onstage__quote">&ldquo;{onStage.quote}&rdquo;</blockquote>
            </Reveal>
          </div>
        </div>

        <Divider />
      </div>
    </section>
  )
}
