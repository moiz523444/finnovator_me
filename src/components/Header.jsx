import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button } from './ui.jsx'
import logo from '../assets/svg/logo-nav.svg'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Why Choose Us', id: 'why-us' },
  { label: 'Case Studies', id: 'case-studies' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')
  const linksRef = useRef(null)
  const pillRef = useRef(null)

  // compact / hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 40)
        if (Math.abs(y - lastY) > 6) {
          setHidden(y > lastY && y > window.innerHeight * 0.9)
          lastY = y
        }
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // active section tracking
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // sliding highlight pill behind the active link
  useLayoutEffect(() => {
    const place = () => {
      const wrap = linksRef.current
      const pill = pillRef.current
      const el = wrap?.querySelector(`[data-id="${active}"]`)
      if (!wrap || !pill || !el) return
      pill.style.width = `${el.offsetWidth}px`
      pill.style.transform = `translateX(${el.offsetLeft}px)`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    if (window.__lenis)
      window.__lenis.scrollTo(target, {
        offset: id === 'home' ? 0 : -20,
        duration: 1.8,
        easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
      })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
      <header
        className={`nav glass ${scrolled ? 'nav--scrolled' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${
          open ? 'nav--open' : ''
        }`}
      >
        <a href="#home" className="nav__logo" aria-label="Finnovator home" onClick={(e) => go(e, 'home')}>
          <img src={logo} alt="Finnovator" />
        </a>
        <nav className="nav__links" aria-label="Main" ref={linksRef}>
          <span className="nav__pill" ref={pillRef} aria-hidden="true" />
          {links.map((l) => (
            <a
              key={l.id}
              data-id={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : ''}
              aria-current={active === l.id ? 'true' : undefined}
              onClick={(e) => go(e, l.id)}
            >
              <span className="nav__link-text" data-text={l.label}>
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <Button href="#contact" className="nav__cta" onClick={(e) => go(e, 'contact')}>
          Get a quote
        </Button>
        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  )
}
