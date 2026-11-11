import { Button, CropVideo, Wordmark } from './ui.jsx'
import bust from '../assets/img/hero-bust.webp'
import clutch from '../assets/img/badge-clutch.webp'
import google from '../assets/img/badge-google.webp'
import goodfirms from '../assets/img/badge-goodfirms.webp'
import designrush from '../assets/img/badge-designrush.webp'

const badges = [
  { src: clutch, alt: 'Clutch 4.9/5.0 rating', w: 13.2 },
  { src: google, alt: 'Google Reviews', w: 13.2 },
  { src: goodfirms, alt: 'GoodFirms', w: 9.4 },
  { src: designrush, alt: 'Reviewed on DesignRush', w: 15.3 },
]

export default function Hero() {
  return (
    <section className="section hero" id="home">
      <Wordmark variant="hero" className="hero__wordmark" />
      <img className="hero__bust" src={bust} alt="" fetchPriority="high" />
      <div className="hero__fade" />

      <div className="hero__content">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-lg">Innovation,</span>{' '}
            <span className="hero__title-sm">Strategy &amp; Technology</span>
          </h1>
          <p className="text hero__text">
            We build innovative digital solutions that help businesses grow, improve efficiency, and succeed in a
            rapidly evolving digital world.
          </p>
          <div className="hero__actions">
            <Button href="#services">Our Services</Button>
            <Button href="#case-studies" variant="glass">
              Explore Our Work
            </Button>
          </div>
        </div>
        <div className="hero__badges">
          {badges.map((b) => (
            <img key={b.alt} src={b.src} alt={b.alt} style={{ width: `${b.w}rem` }} />
          ))}
        </div>
      </div>

      <CropVideo className="hero__ring" src="/videos/light-ring.mp4" crop={[1, 0, 0.7711, 0.12556]} />
    </section>
  )
}
