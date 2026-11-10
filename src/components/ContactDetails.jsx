import { useState } from 'react'
import { Phone, Mail, Copy, Check } from 'lucide-react'
import { Stagger, StaggerItem } from './ui/Reveal'

/**
 * Janani's name, mobile and email as clean lines (no cards).
 * Used in both the contact form block and the footer.
 * tone: 'light' (on paper) or 'dark' (on ink).
 */
export default function ContactDetails({ contact, name, tone = 'dark', copyable = false }) {
  const [copied, setCopied] = useState('')
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      // clipboard blocked: the link itself still works
    }
  }

  const rows = [
    { key: 'phone', label: 'Mobile', value: contact.phone, href: telHref, Icon: Phone },
    { key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail }
  ]

  return (
    <Stagger className={`cd cd--${tone}`} stagger={0.1}>
      <StaggerItem className="cd__name">{name}</StaggerItem>
      {rows.map(({ key, label, value, href, Icon }) => (
        <StaggerItem key={key} className="cd__row">
          <span className="cd__icon" aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>
          <span className="cd__text">
            <span className="cd__label">{label}</span>
            <a className={`cd__value ${key === 'email' ? 'cd__value--email' : ''}`} href={href}>{value}</a>
          </span>
          {copyable && (
            <button
              type="button"
              className="cd__copy"
              onClick={() => copy(value, key)}
              aria-label={`Copy ${label.toLowerCase()}`}
              title={`Copy ${label.toLowerCase()}`}
            >
              {copied === key ? <Check size={15} /> : <Copy size={15} />}
            </button>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  )
}
