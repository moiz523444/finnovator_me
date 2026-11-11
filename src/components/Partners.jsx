const logos = import.meta.glob('../assets/img/logo-*.webp', { eager: true, import: 'default' })
const logo = (n) => logos[`../assets/img/logo-${n}.webp`]

// sizes (in design px / 10) taken from the Figma frames
const rows = [
  [
    { n: 1, name: 'Meridio', w: 17.5, h: 4.2 },
    { n: 2, name: 'Column', w: 17.5, h: 4.2 },
    { n: 3, name: 'GlobalReader', w: 20.4, h: 5 },
    { n: 4, name: 'Shield Republic', w: 19.6, h: 4.7 },
    { n: 5, name: 'Stakester', w: 17.5, h: 4.2 },
  ],
  [
    { n: 6, name: 'Analog', w: 20.8, h: 5 },
    { n: 7, name: 'Freshprep', w: 20.8, h: 5 },
    { n: 8, name: 'NymCard', w: 20.8, h: 5 },
    { n: 9, name: 'Artefy', w: 20.8, h: 5 },
    { n: 10, name: 'Stitch', w: 20.8, h: 5 },
  ],
]

export default function Partners() {
  return (
    <section className="section section--gray partners">
      <div className="section-head section-head--center partners__head">
        <h2 className="h-xl">
          <span className="c-blue">Partners</span> Across <span className="c-blue">Every</span> Stage
        </h2>
        <p className="text partners__sub">
          We collaborate with businesses, startups, and industry leaders to deliver innovative digital solutions that
          drive growth, strengthen partnerships, and create lasting value. From emerging ideas to established
          enterprises, Finnovator supports every stage of the digital journey with technology, expertise, and a shared
          vision for success.
        </p>
      </div>
      <div className="partners__logos">
        {rows.map((row, i) => (
          <div className="partners__row" key={i}>
            {row.map((l) => (
              <img
                key={l.n}
                src={logo(l.n)}
                alt={l.name}
                loading="lazy"
                style={{ width: `${l.w}rem`, height: `${l.h}rem` }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
