import { Button, CropVideo } from './ui.jsx'

const steps = [
  {
    title: ['Discover &', 'Understand'],
    text: 'We begin by understanding your business goals, target audience, and unique challenges. Through research, discovery, and strategic discussions, we identify opportunities and build a clear foundation for creating digital solutions that align with your vision.',
    video: '/videos/step-1.mp4',
    crop: [1, 0, 1, 0],
    deco: 'one',
  },
  {
    title: ['Strategize', '& Design'],
    text: 'We transform insights into actionable strategies and intuitive digital experiences. Our team focuses on user-centered design, seamless functionality, and innovative solutions that balance business objectives with exceptional usability and visual appeal.',
    video: '/videos/step-2.mp4',
    crop: [1.09589, -0.09789, 1.07306, -0.07306],
    deco: 'two',
  },
  {
    title: ['Develop &', 'Implement'],
    text: 'We bring your vision to life using modern technologies, scalable architecture, and industry best practices. Our development process focuses on building secure, reliable, and high-performing digital products tailored to your business requirements.',
    video: '/videos/step-3.mp4',
    crop: [0.82167, 0.06083, 1.14595, -0.14595],
    deco: 'three',
  },
  {
    title: ['Test, Launch', '& Optimize'],
    text: 'Before launch, we carefully test every feature to ensure quality, performance, and a seamless user experience. After deployment, we focus on continuous improvement, optimization, and ongoing support to help your digital solution grow with your business.',
    video: '/videos/step-4.mp4',
    crop: [1.12308, -0.12308, 0.74128, 0.10203],
    deco: 'four',
  },
]

export default function Roadmap() {
  return (
    <section className="section section--blue roadmap" id="process">
      <div className="section-head section-head--row">
        <div className="section-head__copy roadmap__copy">
          <h2 className="h-xl">
            Guided Roadmap
            <br />
            to Digital Success
          </h2>
          <p className="text">
            We follow a strategic, step-by-step approach to transform your ideas into powerful digital solutions. From
            understanding your vision to delivering scalable technology, our process ensures innovation, efficiency,
            and long-term business success.
          </p>
        </div>
        <Button href="#process">Explore Our Process</Button>
      </div>

      <div className="roadmap__cards">
        {steps.map((s) => (
          <article key={s.title[0]} className="step-card">
            <div className="step-card__shade" />
            <CropVideo className={`step-card__deco step-card__deco--${s.deco}`} src={s.video} crop={s.crop} />
            <div className="step-card__body">
              <h3 className="step-card__title">
                {s.title[0]}
                <br />
                {s.title[1]}
              </h3>
              <p className="text">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
