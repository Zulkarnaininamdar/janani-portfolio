import ArchFrame from './ui/ArchFrame'
import ContactForm from './ContactForm'
import SectionHeading from './ui/SectionHeading'
import Divider from './ui/Divider'
import Reveal, { Stagger, StaggerItem, RevealText } from './ui/Reveal'

export default function Collaborate({ collaborate, personName }) {
  const { items, howWeBegin, closing, contact } = collaborate
  const hasContact = Object.entries(contact).some(([k, v]) => k !== '_note' && v !== null)

  return (
    <section id="collaborate" className="section section--light">
      <div className="container">
        <SectionHeading index="08" eyebrow={collaborate.eyebrow} heading={collaborate.heading} light />

        {/* Services */}
        <Stagger className="services" stagger={0.1}>
          {items.map((item, i) => (
            <StaggerItem key={i} className="service">
              <span className="service__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service__title">{item.title}</h3>
              <p className="service__text">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* How we begin */}
        <Reveal className="block begin">
          <h3 className="begin__heading">{howWeBegin.heading}</h3>
          <Stagger as="ol" className="begin__steps" stagger={0.12}>
            {howWeBegin.steps.map((step, i) => (
              <StaggerItem as="li" key={i} className="begin__step">
                <span className="begin__n">{String(i + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Closing */}
        <div className="block split split--even closing">
          <div className="split__media">
            <ArchFrame
              src={`/images/${closing.image}`}
              alt={closing.imageAlt}
              size={460}
              light
              caption={closing.caption}
            />
          </div>
          <div className="closing__text">
            <p className="closing__greeting">
              <RevealText>{closing.greeting}</RevealText>
            </p>
            <Reveal delay={0.15}>
              <p className="closing__meaning">&ldquo;{closing.greetingMeaning}&rdquo;</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="closing__line">{closing.line}</p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="closing__sig">— {closing.signature}</p>
            </Reveal>
          </div>
        </div>

        {/* Contact */}
        {contact.email && contact.phone ? (
          <ContactForm contact={contact} personName={personName} />
        ) : (
          <Reveal className="block contact">
            <p className="eyebrow contact__label">Contact</p>
            {hasContact ? (
              <div className="contact__list">
                {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
                {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
              </div>
            ) : (
              <p className="contact__soon">
                Contact details coming soon. For cultural events, lectures or awareness enquiries, please check back shortly.
              </p>
            )}
          </Reveal>
        )}

        <Divider />
      </div>
    </section>
  )
}
