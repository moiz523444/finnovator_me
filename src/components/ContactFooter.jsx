import { useState } from 'react'
import { Button, Wordmark } from './ui.jsx'
import phone from '../assets/svg/ic-phone.svg'
import chevron from '../assets/svg/ic-chevron.svg'
import logo from '../assets/svg/logo-footer.svg'
import rv1 from '../assets/svg/rv-1.svg'
import rv2 from '../assets/svg/rv-2.svg'
import rv3 from '../assets/svg/rv-3.svg'
import rv4 from '../assets/svg/rv-4.svg'
import linkedin from '../assets/svg/so-linkedin.svg'
import x from '../assets/svg/so-x.svg'
import instagram from '../assets/svg/so-instagram.svg'
import youtube from '../assets/svg/so-youtube.svg'

const details = [
  { label: 'Contact Number', value: '+971 56 445 2061', href: 'tel:+971564452061' },
  { label: 'Email', value: 'finnovators.me', href: 'https://finnovators.me' },
  { label: 'location', value: 'Dubai Silicon Oasis DDP Building A1 Dubai, United Arab Emirates' },
]

const reviews = [
  { icon: rv1, label: 'Clutch' },
  { icon: rv2, label: 'GoodFirms' },
  { icon: rv3, label: 'Reviews' },
  { icon: rv4, label: 'G2' },
]

const socials = [
  { icon: linkedin, label: 'LinkedIn', href: '#' },
  { icon: x, label: 'X (Twitter)', href: '#' },
  { icon: instagram, label: 'Instagram', href: '#' },
  { icon: youtube, label: 'YouTube', href: '#' },
]

const footerCols = [
  { title: 'Quick Links', links: ['Home', 'About Us', 'Our Services', 'Our Portfolio', 'Blogs & Insights', 'Contact Us'] },
  {
    title: 'Services',
    links: ['Web Development', 'App Development', 'UI/UX Design', 'Software Solutions', 'Digital Transformation', 'Business Automation'],
  },
  { title: 'Info Links', links: ['FAQs', 'Our Process', 'Industries', 'Privacy Policy', 'Terms & Conditions', 'Cookie Policy'] },
]

const services = ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Custom Software Solutions', 'Business Automation', 'Digital Transformation', 'Technology Consulting']

function CircleIcon({ src, label, href }) {
  const Tag = href ? 'a' : 'span'
  return (
    <Tag className="circle-icon glass" href={href} aria-label={label} title={label}>
      <img src={src} alt="" />
    </Tag>
  )
}

function Socials() {
  return (
    <div className="icon-row">
      {socials.map((s) => (
        <CircleIcon key={s.label} src={s.icon} label={s.label} href={s.href} />
      ))}
    </div>
  )
}

export default function ContactFooter() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to your backend / email service
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact__top">
        <div className="section-head section-head--center contact__head">
          <h2 className="h-xl">
            Let&apos;s Build Something
            <br />
            Great Together.
          </h2>
          <p className="text contact__sub">
            Have a project in mind or looking for innovative digital solutions? Share your ideas with us, and let&apos;s
            explore how Finnovator can help transform your vision into a powerful digital experience.
          </p>
        </div>

        <div className="contact__row">
          <aside className="contact-card glass">
            <div className="contact-card__group">
              <h3 className="contact-card__title">Contact Details</h3>
              <ul className="contact-card__list">
                {details.map((d) => (
                  <li key={d.label} className="detail">
                    <span className="circle-icon glass">
                      <img src={phone} alt="" />
                    </span>
                    <div className="detail__text">
                      <span className="detail__label">{d.label}</span>
                      {d.href ? (
                        <a className="detail__value" href={d.href}>
                          {d.value}
                        </a>
                      ) : (
                        <span className="detail__value">{d.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="contact-card__hr" />
            <div className="contact-card__group contact-card__group--sm">
              <h3 className="contact-card__title">5 Star Reviews</h3>
              <div className="icon-row">
                {reviews.map((r) => (
                  <CircleIcon key={r.label} src={r.icon} label={r.label} href="#" />
                ))}
              </div>
            </div>
            <div className="contact-card__group contact-card__group--sm">
              <h3 className="contact-card__title">Our Socials</h3>
              <Socials />
            </div>
          </aside>

          <form className="contact-form" onSubmit={onSubmit}>
            <label className="field">
              <span className="field__label">Full Name *</span>
              <input className="field__input glass" name="name" placeholder="Enter Your Full Name*" required />
            </label>
            <label className="field">
              <span className="field__label">Email Address *</span>
              <input className="field__input glass" type="email" name="email" placeholder="Enter Your Email Address*" required />
            </label>
            <label className="field">
              <span className="field__label">Phone Number*</span>
              <input className="field__input glass" type="tel" name="phone" placeholder="Enter Your Phone Number*" required />
            </label>
            <label className="field">
              <span className="field__label">Service Required</span>
              <span className="field__select">
                <select className="field__input glass" name="service" defaultValue="">
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <img src={chevron} alt="" />
              </span>
            </label>
            <label className="field">
              <span className="field__label">Project Details *</span>
              <textarea className="field__input field__input--area glass" name="message" placeholder="Message*" required />
            </label>
            <button type="submit" className="btn btn--solid contact-form__submit">
              {sent ? 'Thank you! We’ll be in touch' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      <div className="cta">
        <p className="cta__kicker">Have A Project To Discuss?</p>
        <p className="cta__title">We&apos;re Ready!</p>
        <Button href="#contact">Let&apos;s Talk</Button>
      </div>

      <hr className="contact__line" />

      <footer className="footer">
        <div className="footer__brand">
          <img className="footer__logo" src={logo} alt="Finnovator" />
          <p className="text">
            Empowering businesses through innovative technology, smart digital solutions, and future-ready strategies. We
            transform ideas into powerful digital experiences that drive growth and lasting success.
          </p>
          <Socials />
        </div>
        {footerCols.map((c) => (
          <div key={c.title} className="footer__col">
            <h4 className="footer__title">{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__news">
          <h4 className="footer__title">Stay Updated</h4>
          <p className="footer__news-text">
            Get the latest technology insights, digital trends, and business innovations delivered to your inbox.
          </p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address*" aria-label="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </footer>

      <hr className="contact__line" />

      <Wordmark variant="footer" className="contact__wordmark" />
    </section>
  )
}
