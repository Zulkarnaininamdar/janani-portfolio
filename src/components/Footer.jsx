import { ArrowUp } from 'lucide-react'
import Reveal, { RevealText } from './ui/Reveal'
import ContactDetails from './ContactDetails'
import { scrollToTop } from '../lib/smooth'

export default function Footer({ footer, contact = {}, personName }) {
  const hasContact = contact.phone && contact.email

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__line">
            <RevealText stagger={0.05}>{footer.line}</RevealText>
          </p>
          <button
            className="footer__top-btn"
            onClick={() => scrollToTop()}
            aria-label="Back to top"
          >
            <ArrowUp size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Logo left · contact right */}
        <div className="footer__main">
          <Reveal className="footer__logo-wrap">
            <img
              className="footer__logo"
              src="/images/brand/logo-full.jpg"
              alt="Heal Your Soul — Mind, Body, Soul Wellness"
              width="1000"
              height="500"
              loading="lazy"
            />
          </Reveal>

          {hasContact && (
            <div className="footer__contact-col">
              <Reveal y={12}>
                <span className="eyebrow">Contact</span>
              </Reveal>
              <ContactDetails contact={contact} name={personName} tone="dark" />
            </div>
          )}
        </div>

        <Reveal className="footer__bottom">
          <p className="footer__mission">{footer.mission}</p>
          <p className="footer__copy">{footer.copyright}</p>
        </Reveal>
      </div>
    </footer>
  )
}
