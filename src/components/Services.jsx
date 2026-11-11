import { Button } from './ui.jsx'
import swoosh from '../assets/svg/swoosh.svg'
import arrowA from '../assets/svg/card-arrow.svg'
import arrowB from '../assets/svg/card-arrow-b.svg'
import arrowRight from '../assets/svg/arrow-right.svg'
import vr from '../assets/img/svc-vr.webp'
import dev from '../assets/img/svc-dev.webp'
import laptop from '../assets/img/svc-laptop.webp'
import robot from '../assets/img/svc-robot.webp'

const services = [
  {
    title: 'Digital Solutions',
    text: 'Smart digital solutions built to simplify business processes and drive growth.',
    img: vr,
    arrow: arrowA,
  },
  {
    title: 'Web Development',
    text: 'Modern, responsive websites designed for performance and seamless user experiences.',
    img: dev,
    arrow: arrowA,
    wide: true,
  },
  {
    title: 'UI/UX Design',
    text: 'Intuitive digital experiences that connect users with your brand.',
    img: laptop,
    arrow: arrowB,
    laptop: true,
  },
  {
    title: 'Business Automation',
    text: 'Intelligent solutions that streamline workflows and improve efficiency.',
    img: robot,
    arrow: arrowB,
  },
]

function ServiceCard({ s, hidden }) {
  return (
    <article className="svc-card" aria-hidden={hidden || undefined} data-cursor="Explore">
      <img className="svc-card__swoosh" src={swoosh} alt="" />
      <div className={`svc-card__body ${s.wide ? 'svc-card__body--wide' : ''}`}>
        <h3 className="svc-card__title">{s.title}</h3>
        <p className="text svc-card__text">{s.text}</p>
        <a href="#contact" className="svc-card__link" tabIndex={hidden ? -1 : undefined}>
          <span>Explore more</span>
          <img src={arrowRight} alt="" />
        </a>
      </div>
      <img className={`svc-card__img ${s.laptop ? 'svc-card__img--laptop' : ''}`} src={s.img} alt="" loading="lazy" />
      <div className="svc-card__glow" />
      <img className="svc-card__arrow" src={s.arrow} alt="" />
    </article>
  )
}

export default function Services() {
  return (
    <section className="section section--blue services" id="services">
      <div className="section-head section-head--row">
        <div className="section-head__copy services__copy">
          <h2 className="h-xl">What We Do</h2>
          <p className="text">
            We combine innovation, strategy, and technology to create powerful digital experiences that help
            businesses grow.
          </p>
        </div>
        <Button href="#services">Our Services</Button>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
          {services.map((s) => (
            <ServiceCard key={`${s.title}-dup`} s={s} hidden />
          ))}
        </div>
      </div>
    </section>
  )
}
