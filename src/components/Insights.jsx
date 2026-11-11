import { Button } from './ui.jsx'
import b1 from '../assets/img/blog-1.webp'
import b2 from '../assets/img/blog-2.webp'
import b3 from '../assets/img/blog-3.webp'
import b4 from '../assets/img/blog-4.webp'

const posts = [
  {
    tag: 'Digital Transformation',
    title: 'The Future of Digital Transformation in Modern Business',
    text: 'Discover how digital transformation is reshaping modern businesses through innovative technologies, smarter workflows, and improved customer experiences. Learn how adopting digital solutions can boost efficiency, strengthen competitiveness, and create new opportunities for sustainable business growth.',
    img: b1,
  },
  {
    tag: 'Business Innovation',
    title: 'How Smart Technology Drives Business Growth',
    text: 'Explore how smart technology helps businesses streamline operations, improve productivity, and make better decisions. From intelligent automation to scalable digital solutions, discover how modern innovations empower organizations to overcome challenges and achieve long-term business success.',
    img: b2,
  },
  {
    tag: 'UI/UX Design',
    title: 'Why UI/UX Design Matters for Digital Success',
    text: 'Learn how thoughtful UI/UX design creates seamless digital experiences that improve usability, increase engagement, and build customer trust. Discover why user-centered design plays a vital role in developing successful websites, mobile applications, and digital products.',
    img: b3,
  },
  {
    tag: 'Technology Trends',
    title: 'Top Technology Trends Shaping the Future',
    text: 'Stay ahead of emerging technology trends transforming the digital landscape. From artificial intelligence and cloud computing to automation and advanced software solutions, explore the innovations helping businesses adapt, scale, and succeed in an increasingly connected world.',
    img: b4,
  },
]

export default function Insights() {
  return (
    <section className="section section--blue insights" id="insights">
      <div className="section-head section-head--row">
        <div className="section-head__copy insights__copy">
          <h2 className="h-xl">Insights, Tips &amp; Stories</h2>
          <p className="text">
            Stay inspired with the latest technology trends, expert insights, and innovative ideas shaping the digital
            world. Explore practical tips, industry updates, and valuable strategies to help your business embrace
            innovation, improve performance, and achieve sustainable growth.
          </p>
        </div>
        <Button href="#insights">Explore All Insights</Button>
      </div>

      <div className="insights__grid">
        {posts.map((p) => (
          <article key={p.title} className="post">
            <div className="post__media" data-cursor="Read">
              <img className="post__img" src={p.img} alt="" loading="lazy" />
            </div>
            <div className="post__body">
              <span className="post__tag">{p.tag}</span>
              <h3 className="post__title">{p.title}</h3>
              <p className="text">{p.text}</p>
              <Button href="#insights">Read More</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
