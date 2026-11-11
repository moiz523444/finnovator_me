import { useState } from 'react'
import { Button } from './ui.jsx'
import plus from '../assets/svg/ic-plus.svg'
import minus from '../assets/svg/ic-minus.svg'
import a1 from '../assets/img/avatar-1.webp'
import a2 from '../assets/img/avatar-2.webp'
import a3 from '../assets/img/avatar-3.webp'

// Only the first answer exists in the Figma file; the rest are placeholder copy — replace with final content.
const faqs = [
  {
    q: 'What services does Finnovator offer?',
    a: 'Finnovator offers a wide range of digital solutions, including website development, mobile app development, custom software solutions, UI/UX design, business automation, and technology consulting. Our services are designed to help businesses improve efficiency, strengthen their digital presence, and achieve sustainable growth.',
  },
  {
    q: 'How can Finnovator help my business grow?',
    a: 'We combine strategy, design, and technology to build digital products that attract the right audience, streamline your operations, and turn visitors into customers — so your business can scale with confidence.',
  },
  {
    q: 'Do you provide customized digital solutions?',
    a: 'Yes. Every project starts with understanding your goals and challenges, and we tailor the design, features, and technology stack to fit your business — never a one-size-fits-all template.',
  },
  {
    q: 'How long does it take to complete a project?',
    a: 'Timelines depend on scope and complexity. A focused website can take a few weeks, while larger platforms and custom software are delivered in planned phases. We share a clear schedule before work begins.',
  },
  {
    q: 'Do you offer ongoing support and maintenance?',
    a: 'Absolutely. After launch we provide continuous support, updates, performance monitoring, and improvements to keep your digital solution secure, fast, and growing with your business.',
  },
  {
    q: 'How can I get started with Finnovator?',
    a: "Simply reach out through our contact form or give us a call. We'll schedule a free consultation to discuss your idea, goals, and the best way forward.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--gray faq" id="faq">
      <div className="section-head section-head--center faq__head">
        <h2 className="h-xl">
          Frequently <span className="c-blue">Asked</span> Questions
        </h2>
        <p className="text faq__sub">
          Find answers to common questions about our digital solutions, development process, and technology services.
          Discover how Finnovator helps businesses innovate, grow, and succeed through smart digital experiences.
        </p>
      </div>

      <div className="faq__row">
        <div className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="faq-item__text">{f.q}</span>
                  <span className="faq-item__icon">
                    <img src={isOpen ? minus : plus} alt="" />
                  </span>
                </button>
                <div className="faq-item__a" id={`faq-a-${i}`} role="region">
                  <div>
                    <p className="text">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="faq-card">
          <span className="faq-card__c faq-card__c--1" />
          <span className="faq-card__c faq-card__c--2" />
          <span className="faq-card__c faq-card__c--3" />
          <span className="faq-card__c faq-card__c--4" />
          <span className="faq-card__c faq-card__c--5" />
          <span className="faq-card__c faq-card__c--6" />
          <div className="faq-card__content">
            <div className="avatars">
              <img className="avatars__a avatars__a--1" src={a1} alt="" loading="lazy" />
              <img className="avatars__a avatars__a--2" src={a2} alt="" loading="lazy" />
              <img className="avatars__a avatars__a--3" src={a3} alt="" loading="lazy" />
            </div>
            <div className="faq-card__copy">
              <h3 className="faq-card__title">
                Still <span className="c-blue">Have</span>
                <br />
                Questions?
              </h3>
              <p className="text">
                Have a question or a project in mind? Our team is here to help you explore the right digital solutions
                for your business. Let&apos;s connect and turn your ideas into reality.
              </p>
              <Button href="#contact">Contact Us</Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
