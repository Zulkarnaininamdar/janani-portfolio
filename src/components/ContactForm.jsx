import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ContactDetails from './ContactDetails'
import SectionHeading from './ui/SectionHeading'
import Reveal, { EASE } from './ui/Reveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Contact block: highlighted phone + email, and a simple three-field form.
 * There is no server, so sending opens the visitor's email app with the
 * message already addressed to Janani.
 */
export default function ContactForm({ contact, personName }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 5) er.message = 'Please write a short message.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const subject = `Enquiry from ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`
    window.location.href =
      `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div id="contact" className="block contact-x">
      <div className="contact-x__intro">
        <SectionHeading eyebrow="Contact" heading="Get in Touch" light small />
      </div>

      <div className="contact-x__grid">
        {/* Janani's details */}
        <div className="contact-x__details">
          <ContactDetails contact={contact} name={personName} tone="light" copyable />
        </div>

        {/* Simple form */}
        <Reveal delay={0.15}>
          <form className="c-form" onSubmit={onSubmit} noValidate>
            <div className={`c-field ${errors.name ? 'has-error' : ''}`}>
              <input
                id="cf-name"
                type="text"
                placeholder=" "
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cf-name-err' : undefined}
              />
              <label htmlFor="cf-name">Your name</label>
              <span className="c-field__line" />
              {errors.name && <span id="cf-name-err" className="c-field__err">{errors.name}</span>}
            </div>

            <div className={`c-field ${errors.email ? 'has-error' : ''}`}>
              <input
                id="cf-email"
                type="email"
                placeholder=" "
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-err' : undefined}
              />
              <label htmlFor="cf-email">Your email</label>
              <span className="c-field__line" />
              {errors.email && <span id="cf-email-err" className="c-field__err">{errors.email}</span>}
            </div>

            <div className={`c-field ${errors.message ? 'has-error' : ''}`}>
              <textarea
                id="cf-message"
                rows={4}
                placeholder=" "
                value={form.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-err' : undefined}
              />
              <label htmlFor="cf-message">Your message</label>
              <span className="c-field__line" />
              {errors.message && <span id="cf-message-err" className="c-field__err">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn--dark c-form__submit">
              Send Message <ArrowUpRight size={16} strokeWidth={1.5} className="btn__arrow" />
            </button>

            <AnimatePresence>
              {sent && (
                <motion.p
                  className="c-form__note"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  Your email app should now open with the message ready. If it doesn’t, write to{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
