// All page motion: smooth scroll (Lenis), scroll-driven reveals & parallax (GSAP ScrollTrigger),
// split-line headings (SplitText), counters, magnetic buttons, card spotlight/tilt and custom cursor.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

const EASE = 'expo.out'
const q = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** fade/slide elements in once when they scroll into view */
function reveal(targets, from, { trigger, start = 'top 85%', stagger = 0.08, duration = 1.1, delay = 0 } = {}) {
  const els = gsap.utils.toArray(targets)
  if (!els.length) return
  return gsap.from(els, {
    opacity: 0,
    ...from,
    duration,
    delay,
    stagger,
    ease: EASE,
    clearProps: 'transform,opacity,clipPath,filter',
    scrollTrigger: { trigger: trigger || els[0], start, once: true },
  })
}

/** split a heading into masked lines and slide them up */
function splitReveal(el, { start = 'top 88%', delay = 0, scroll = true } = {}) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 115,
        rotate: 2.5,
        transformOrigin: '0% 100%',
        duration: 1.25,
        delay,
        stagger: 0.1,
        ease: EASE,
        scrollTrigger: scroll ? { trigger: el, start, once: true } : undefined,
      })
    },
  })
}

/** draw an SVG wordmark outline (path uses pathLength=1) */
function drawPath(path, vars) {
  gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 })
  return gsap.to(path, { strokeDashoffset: 0, ease: 'power2.inOut', ...vars })
}

export function initMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  const cleanups = []
  const on = (el, type, fn, opts) => {
    el.addEventListener(type, fn, opts)
    cleanups.push(() => el.removeEventListener(type, fn, opts))
  }

  // ---------- Smooth scroll ----------
  let lenis = null
  if (!reduce) {
    // buttery inertia scrolling (lerp-based); touch devices keep native momentum
    lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      syncTouch: false,
      anchors: { offset: -20 },
      prevent: (node) => node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT',
    })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    cleanups.push(() => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    })
  }

  const ctx = gsap.context(() => {
    // ---------- Scroll progress bar ----------
    gsap.to('.scroll-progress span', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })

    if (reduce) return

    // ---------- HERO intro ----------
    const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 })
    tl.from('.nav', { opacity: 0, duration: 0.8 }, 0)
      .from('.nav__logo, .nav__links a, .nav__cta, .nav__toggle', { y: -30, opacity: 0, stagger: 0.06, duration: 1, clearProps: 'transform,opacity' }, 0.1)
      .from('.hero__bust', { opacity: 0, scale: 1.12, yPercent: 6, duration: 2, ease: 'power3.out', clearProps: 'opacity' }, 0)
      .from('.hero__ring', { opacity: 0, scale: 0.3, rotate: -120, duration: 2, ease: 'power3.out', clearProps: 'opacity' }, 0.5)
      .from('.hero__text, .hero__actions .btn, .hero__badges', { y: 40, opacity: 0, stagger: 0.09, duration: 1.2, clearProps: 'transform,opacity' }, 0.75)
    q('.hero__title-lg, .hero__title-sm').forEach((el, i) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, rotate: 3, transformOrigin: '0% 100%', duration: 1.4, ease: EASE, delay: 0.35 + i * 0.12 }),
      })
    })
    const heroPath = document.querySelector('.hero__wordmark path')
    if (heroPath) drawPath(heroPath, { duration: 3, delay: 0.6 })

    // hero parallax while scrolling away
    // (uses px `y` so it never fights the intro's yPercent/scale/rotate)
    const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
    gsap.to('.hero__bust', { y: () => window.innerHeight * 0.14, ease: 'none', scrollTrigger: heroST })
    gsap.to('.hero__content', { y: -120, opacity: 0.2, ease: 'none', scrollTrigger: heroST })
    gsap.to('.hero__ring', { y: -180, ease: 'none', scrollTrigger: heroST })
    gsap.to('.hero__wordmark', { xPercent: -6, ease: 'none', scrollTrigger: heroST })

    // ---------- Section headings ----------
    q('.section .h-xl').forEach((h) => splitReveal(h))
    q('.case__title, .faq-card__title, .cta__kicker, .bento-info__title, .step-card__title, .aud-card__title').forEach((h) =>
      splitReveal(h, { start: 'top 92%' }),
    )
    q('.section-head').forEach((head) => {
      reveal(q('.text, .btn', head), { y: 30 }, { trigger: head, delay: 0.25 })
    })

    // ---------- What we do ----------
    reveal('.svc-card', { y: 140, rotate: 4 }, { trigger: '.marquee', stagger: 0.1, duration: 1.3 })

    // ---------- Audience cards: fan in ----------
    gsap.from('.aud-card', {
      y: 260,
      rotate: 0,
      opacity: 0,
      duration: 1.5,
      stagger: 0.14,
      ease: EASE,
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '.audience__cards', start: 'top 85%', once: true },
    })
    q('.aud-card__wordmark path').forEach((p) =>
      drawPath(p, { duration: 2.2, scrollTrigger: { trigger: p.closest('.aud-card'), start: 'top 70%', once: true } }),
    )

    // ---------- Bento ----------
    reveal('.bento__row--top > *', { y: 90, scale: 0.94 }, { trigger: '.bento', stagger: 0.12, duration: 1.3 })
    reveal('.bento__row--bottom .bento-stat, .bento__row--bottom > .bento-dark', { y: 90, scale: 0.94 }, {
      trigger: '.bento__row--bottom',
      stagger: 0.1,
      duration: 1.3,
    })
    reveal('.bento-process__tree', { clipPath: 'inset(0 100% 100% 0)' }, { trigger: '.bento-process', duration: 1.6, delay: 0.3 })
    reveal('.chip', { x: -30 }, { trigger: '.bento-process', stagger: 0.09, delay: 0.5 })
    q('.tags').forEach((t) => reveal(q('.tag', t), { y: 16, scale: 0.9 }, { trigger: t, stagger: 0.05, start: 'top 95%' }))
    q('[data-count]').forEach((el) => {
      const end = +el.dataset.count
      const suffix = el.dataset.suffix || ''
      const obj = { v: 0 }
      el.textContent = `0${suffix}`
      gsap.to(obj, {
        v: end,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: () => (el.textContent = `${Math.round(obj.v)}${suffix}`),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    // ---------- Partners ----------
    reveal('.partners__row img', { y: 40, scale: 0.85 }, { trigger: '.partners__logos', stagger: 0.06 })

    // ---------- Roadmap ----------
    reveal('.step-card', { y: 160, rotateX: -25, transformPerspective: 1200, transformOrigin: '50% 100%' }, {
      trigger: '.roadmap__cards',
      stagger: 0.13,
      duration: 1.4,
    })

    // ---------- Case studies ----------
    q('.case').forEach((c) => {
      const media = c.querySelector('.case__media, .case__img')
      const inner = c.querySelector('.case__video')
      const st = { trigger: c, start: 'top 82%', once: true }
      gsap.from(media, { clipPath: 'inset(18% 18% 18% 18% round 3rem)', duration: 1.6, ease: EASE, clearProps: 'clipPath', scrollTrigger: st })
      if (inner) gsap.from(inner, { scale: 1.35, duration: 1.8, ease: EASE, clearProps: 'transform', scrollTrigger: st })
      gsap.from(c.querySelector('.case__panel'), {
        y: 80,
        opacity: 0,
        duration: 1.3,
        ease: EASE,
        delay: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: st,
      })
      reveal(q('.case__label, .case__copy .text, .case__copy .btn', c), { y: 30 }, { trigger: c, delay: 0.35 })
      // subtle parallax of the media inside its frame
      if (inner) gsap.fromTo(inner.querySelector('video'), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: c, scrub: true } })
    })

    // ---------- Insights ----------
    reveal('.post', { y: 120 }, { trigger: '.insights__grid', stagger: 0.12, duration: 1.3 })
    q('.post').forEach((p) => {
      gsap.from(p.querySelector('.post__media img'), {
        scale: 1.35,
        duration: 1.8,
        ease: EASE,
        clearProps: 'transform',
        scrollTrigger: { trigger: p, start: 'top 85%', once: true },
      })
    })

    // ---------- FAQ ----------
    reveal('.faq-item', { x: -60 }, { trigger: '.faq__list', stagger: 0.08 })
    reveal('.faq-card', { x: 100, scale: 0.94 }, { trigger: '.faq__row', duration: 1.4 })
    reveal('.avatars__a', { scale: 0, rotate: -30 }, { trigger: '.faq-card', stagger: 0.12, delay: 0.4, duration: 1.2 })

    // ---------- Contact / CTA / footer ----------
    reveal('.contact-card', { x: -100 }, { trigger: '.contact__row', duration: 1.4 })
    reveal('.contact-form .field, .contact-form__submit', { y: 40 }, { trigger: '.contact-form', stagger: 0.08 })
    reveal('.detail, .contact-card .icon-row .circle-icon', { y: 20, scale: 0.9 }, { trigger: '.contact-card', stagger: 0.05, delay: 0.3 })
    gsap.from('.cta__title', {
      scale: 0.7,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1.6,
      ease: EASE,
      clearProps: 'filter,opacity,transform',
      scrollTrigger: { trigger: '.cta', start: 'top 85%', once: true },
    })
    reveal('.cta .btn', { y: 30 }, { trigger: '.cta', delay: 0.4 })
    q('.contact__line').forEach((l) => reveal(l, { scaleX: 0, transformOrigin: '0% 50%' }, { start: 'top 95%', duration: 1.6 }))
    reveal('.footer > *', { y: 50 }, { trigger: '.footer', stagger: 0.08 })
    const footPath = document.querySelector('.contact__wordmark path')
    if (footPath) {
      gsap.set(footPath, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.to(footPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.contact__wordmark', start: 'top bottom', end: 'bottom 85%', scrub: 1 },
      })
    }
  })
  cleanups.push(() => ctx.revert())

  // ---------- Pointer-only extras (desktop mouse) ----------
  if (fine && !reduce) {
    // magnetic buttons
    q('[data-magnetic]').forEach((btn) => {
      const label = btn.querySelector('.btn__label')
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
      const lx = label && gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' })
      const ly = label && gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3.out' })
      on(btn, 'pointermove', (e) => {
        const r = btn.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * 0.25)
        yTo(dy * 0.35)
        if (lx) {
          lx(dx * 0.1)
          ly(dy * 0.12)
        }
      })
      on(btn, 'pointerleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
        if (label) gsap.to(label, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
      })
    })

    // spotlight that follows the mouse on dark cards
    q('.bento-dark, .bento-hero, .bento-stat, .step-card, .aud-card, .contact-card, .post, .case__panel, .svc-card').forEach((card) => {
      card.classList.add('spot')
      on(card, 'pointermove', (e) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    })

    // 3D tilt + lift (GSAP keeps each card's own base rotation from CSS)
    q('.aud-card, .step-card, .bento-stat').forEach((card) => {
      const strength = card.classList.contains('aud-card') ? 9 : 7
      on(card, 'pointermove', (e) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        gsap.to(card, {
          rotationY: px * strength,
          rotationX: -py * strength,
          y: -12,
          transformPerspective: 1100,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
      on(card, 'pointerleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
      })
    })

    // custom cursor
    if (desktop) {
      const dot = document.createElement('div')
      const ring = document.createElement('div')
      dot.className = 'cursor-dot'
      ring.className = 'cursor-ring'
      ring.innerHTML = '<span></span>'
      document.body.append(dot, ring)
      document.documentElement.classList.add('has-cursor')
      const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
      const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
      const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
      const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
      const label = ring.querySelector('span')
      on(window, 'pointermove', (e) => {
        dx(e.clientX)
        dy(e.clientY)
        rx(e.clientX)
        ry(e.clientY)
        const t = e.target.closest?.('[data-cursor], a, button, input, textarea, select, .faq-item__q')
        const text = t?.closest('[data-cursor]')?.dataset.cursor
        ring.classList.toggle('is-hover', !!t && !text)
        dot.classList.toggle('is-hover', !!t && !text)
        ring.classList.toggle('is-label', !!text)
        dot.classList.toggle('is-hidden', !!text)
        if (text) label.textContent = text
      })
      on(document, 'pointerleave', () => ring.classList.add('is-out'))
      on(document, 'pointerenter', () => ring.classList.remove('is-out'))
      cleanups.push(() => {
        dot.remove()
        ring.remove()
        document.documentElement.classList.remove('has-cursor')
      })
    }
  }

  // refresh after fonts/media change layout
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  on(window, 'load', refresh)

  return () => cleanups.reverse().forEach((fn) => fn())
}
