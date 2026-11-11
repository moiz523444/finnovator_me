import { Button, CropVideo } from './ui.jsx'
import tree from '../assets/svg/bento-tree.svg'
import logo from '../assets/svg/logo-bento.svg'
// Figma image-fill crops for the decorative videos: [sx, tx, sy, ty]
const GLOBE_CROP = [0.99456, 0.00272, 0.58741, 0.20629]
const BLOB_CROP = [0.7624, 0.11896, 0.71157, 0.14324]
const CHESS_CROP = [1, 0, 0.6055, 0.21213]

const steps = ['Research', 'Design', 'Development', 'Testing', 'Launch', 'Support']

function Tags({ items, className = '' }) {
  return (
    <ul className={`tags ${className}`}>
      {items.map((t) => (
        <li key={t} className="tag glass">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Stat({ value, label, className = '' }) {
  return (
    <div className={`bento-stat ${className}`}>
      <div className="bento-stat__inner">
        <strong data-count={parseInt(value, 10)} data-suffix={value.replace(/^\d+/, '')}>
          {value}
        </strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

function InfoCard({ deco, title, text, tags, tagsClass, className = '' }) {
  return (
    <div className={`bento-dark bento-info ${className}`}>
      <div className="bento-dark__glow" />
      {deco}
      <div className="bento-info__copy">
        <h3 className="bento-info__title">{title}</h3>
        <p className="text">{text}</p>
      </div>
      <Tags items={tags} className={tagsClass} />
    </div>
  )
}

export default function WhyWeExist() {
  return (
    <section className="section section--blue bento" id="why-us">
      <div className="bento__row bento__row--top">
        <div className="bento-dark bento-process">
          <div className="bento-dark__glow" />
          <img className="bento-process__tree" src={tree} alt="" />
          <ol className="bento-process__steps">
            {steps.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="bento-hero">
          <CropVideo className="bento-hero__ring" src="/videos/light-ring.mp4" crop={[1, 0, 0.54535, 0.12556]} />
          <div className="bento-hero__shade" />
          <img className="bento-hero__logo" src={logo} alt="Finnovator" />
          <div className="bento-hero__copy">
            <h2 className="h-xl">Why We Exist</h2>
            <p className="text">
              To make technology simpler, smarter, and more accessible for businesses ready to innovate and grow.
            </p>
            <Button href="#about" variant="glass">
              read more about us
            </Button>
          </div>
        </div>

        <InfoCard
          className="bento-info--services"
          deco={<CropVideo className="bento-info__deco bento-info__deco--globe" src="/videos/globe.mp4" crop={GLOBE_CROP} />}
          title="Explore Services"
          text="Discover innovative technology solutions designed to improve efficiency, enhance experiences, and support business success."
          tags={['IT Consulting', 'Digital Strategy', 'Cloud Solutions', 'E-Commerce Solutions', 'System Integration', 'Technical Support']}
          tagsClass="tags--services"
        />
      </div>

      <div className="bento__row bento__row--bottom">
        <div className="bento__col bento__col--left">
          <Stat value="200+" label="Projects Delivered" className="bento-stat--tall" />
          <Stat value="100%" label="Client Satisfaction" />
        </div>
        <InfoCard
          className="bento-info--solutions"
          deco={<CropVideo className="bento-info__deco bento-info__deco--blob" src="/videos/blob.mp4" crop={BLOB_CROP} />}
          title="Digital Solutions"
          text="Creating smart, scalable, and innovative digital experiences that solve challenges and accelerate business growth."
          tags={['Web Development', 'Mobile App Development', 'Custom Software Solutions', 'UI/UX Design', 'Business Automation', 'Digital Transformation']}
          tagsClass="tags--solutions"
        />
        <InfoCard
          className="bento-info--experts"
          deco={
            <CropVideo className="bento-info__deco bento-info__deco--chess" src="/videos/chess.mp4" crop={CHESS_CROP}>
              <span className="chess-fade" />
            </CropVideo>
          }
          title="Technology Experts"
          text="Combining technical expertise and creative thinking to build reliable, high-performing solutions for modern businesses."
          tags={['Software Engineers', 'Frontend Developers', 'Backend Developers', 'Mobile App Developers', 'UI/UX Designers', 'Cloud & DevOps Experts']}
          tagsClass="tags--experts"
        />
        <div className="bento__col bento__col--right">
          <Stat value="80+" label="Happy Clients" className="bento-stat--tall" />
          <Stat value="10+" label="Years of Expertise" />
        </div>
      </div>
    </section>
  )
}
