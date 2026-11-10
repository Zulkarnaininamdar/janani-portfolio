import Reveal, { RevealText, DrawLine } from './Reveal'

export default function SectionHeading({
  eyebrow,
  heading,
  light = false,
  index = null,
  center = false,
  small = false,
  as = 'h2'
}) {
  const Title = as
  const classes = [
    'sec-head',
    light && 'is-light',
    center && 'sec-head--center',
    small && 'sec-head--small'
  ].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      {eyebrow && (
        <Reveal y={12} className="sec-head__eyebrow">
          {index && <span className="sec-head__index">{index}</span>}
          <DrawLine className="sec-head__rule" delay={0.1} />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Title className="sec-head__title">
        <RevealText delay={0.1}>{heading}</RevealText>
      </Title>
    </header>
  )
}
