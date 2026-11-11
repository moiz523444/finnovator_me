import { Button, CropVideo } from './ui.jsx'
import c1 from '../assets/img/case-1.webp'
import c2 from '../assets/img/case-2.webp'
import c3 from '../assets/img/case-3.webp'
import c4 from '../assets/img/case-4.webp'

const cases = [
  {
    label: 'Case Study 1 — NovaPay',
    title: 'FinTech / Mobile App + Dashboard',
    text: 'NovaPay is a modern payment and account management app designed for users who want full visibility into their money in real time.',
    img: c1,
    video: '/videos/case-novapay.mp4',
    crop: [1, 0, 0.89645, 0.00852],
    width: 54.1,
  },
  {
    label: 'Case Study 2 — Onumi',
    title: 'Personal Finance Mobile App',
    text: 'Onumi is a personal finance app that helps users track, plan, and manage all their spending in one place.',
    img: c2,
    video: '/videos/case-onumi.mp4',
    crop: [1, 0, 0.93972, 0.0178],
    width: 52.4,
    reverse: true,
  },
  {
    label: 'Case Study 3 — Ouin',
    title: 'Creative Platform, Web Experience',
    text: 'Ouin Studio is a modern creative brand that needed a bold website experience to showcase its identity and future platform vision.',
    img: c3,
    video: '/videos/case-ouin.mp4',
    crop: [1, 0, 0.49156, 0.28763],
    width: 52.4,
  },
  {
    label: 'Case Study 4 — Altive',
    title: 'E-Commerce / Web + Product Experience',
    text: 'Altive Commerce is an e-commerce platform designed for performance combining a premium shopping experience with a clean, modern UI.',
    img: c4,
    video: '/videos/case-altive.mp4',
    // Figma "Fill" (cover) of a 4:3 video in an 865×582 box
    crop: [1, 0, 0.8971, 0.0514],
    width: 61.3,
    reverse: true,
  },
]

export default function CaseStudies() {
  return (
    <section className="section section--gray cases" id="case-studies">
      {cases.map((c) => (
        <article key={c.label} className={`case ${c.reverse ? 'case--reverse' : ''}`}>
          {c.video ? (
            <div className="case__img case__media" data-cursor="View" style={{ backgroundImage: `url(${c.img})` }}>
              <CropVideo className="case__video" src={c.video} crop={c.crop} />
            </div>
          ) : (
            <img className="case__img" src={c.img} alt={`${c.label} preview`} loading="lazy" />
          )}
          <div className="case__panel">
            <div className="case__copy" style={{ '--w': `${c.width}rem` }}>
              <p className="case__label">{c.label}</p>
              <h3 className="case__title">{c.title}</h3>
              <p className="text">{c.text}</p>
              <Button href="#contact">Explore full work</Button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
