import { Button, Wordmark } from './ui.jsx'

const cards = [
  {
    lead: "I'm a",
    strong: 'Startup.',
    text: 'We transform innovative ideas into powerful, scalable digital products that help startups establish their presence, reach the right audience, and accelerate business growth. From initial concept to successful launch, we provide smart technology solutions that turn ambitious visions into lasting success.',
    cta: 'Get Started',
    mod: 'left',
  },
  {
    lead: "I'm an",
    strong: 'Enterprise',
    text: 'We empower enterprises with reliable, innovative, and scalable technology solutions designed to streamline operations, improve productivity, and enhance overall business performance. Our strategic approach helps established organizations embrace digital transformation, overcome complex challenges, and achieve sustainable growth in a competitive market.',
    cta: 'Explore More',
    mod: 'center',
  },
  {
    lead: 'I Need a',
    strong: 'Rescue',
    text: 'We help businesses overcome digital challenges by transforming outdated websites, inefficient systems, and underperforming digital experiences into modern, high-performing solutions. Through innovative strategies, user-focused design, and advanced technologies, we restore functionality, improve performance, and unlock new opportunities for long-term business success.',
    cta: 'Need a Fix',
    mod: 'right',
  },
]

export default function Audience() {
  return (
    <section className="section section--gray audience" id="about">
      <div className="section-head section-head--center audience__head">
        <h2 className="h-xl">
          <span className="c-blue">Whatever You Are,</span>
          <br />
          We Meet You There.
        </h2>
        <p className="text audience__sub">
          We combine innovation, strategy, and technology to create powerful digital experiences that help businesses
          grow.
        </p>
      </div>

      <div className="audience__cards">
        {cards.map((c) => (
          <article key={c.strong} className={`aud-card aud-card--${c.mod}`}>
            <div className="aud-card__body">
              <h3 className="aud-card__title">
                {c.lead}
                <br />
                <strong>{c.strong}</strong>
              </h3>
              <p className="text">{c.text}</p>
            </div>
            <Wordmark variant="card" className="aud-card__wordmark" />
            <Button href="#contact" variant="glass" className="aud-card__btn">
              {c.cta}
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}
