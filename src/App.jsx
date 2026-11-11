import { useLayoutEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Audience from './components/Audience.jsx'
import WhyWeExist from './components/WhyWeExist.jsx'
import Partners from './components/Partners.jsx'
import Roadmap from './components/Roadmap.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import Insights from './components/Insights.jsx'
import Faq from './components/Faq.jsx'
import ContactFooter from './components/ContactFooter.jsx'
import { initMotion } from './motion.js'

export default function App() {
  useLayoutEffect(() => initMotion(), [])

  return (
    <>
      <Header />
      <main className="page">
        <Hero />
        <Services />
        <Audience />
        <WhyWeExist />
        <Partners />
        <Roadmap />
        <CaseStudies />
        <Insights />
        <Faq />
        <ContactFooter />
      </main>
    </>
  )
}
