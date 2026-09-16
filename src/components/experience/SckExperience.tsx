'use client'

import { FormEvent, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SckWebGLScene from './SckWebGLScene'

gsap.registerPlugin(ScrollTrigger)

const materials = [
  ['01', 'MATTE BLACK', 'A surface treated as attitude.'],
  ['02', 'PORTORO', 'Stone selected for movement and depth.'],
  ['03', 'NUBUCK / WOOL', 'Tactile contrast inside a controlled cabin.'],
  ['04', 'CHRISTOFLE', 'Metalwork where utility becomes detail.'],
]

const process = [
  ['01', 'THE BRIEF', 'A direction, a constraint, an impossible ambition.'],
  ['02', 'ARRIVAL', 'The aircraft enters the process as a complete object.'],
  ['03', 'STRIP BACK', 'Cabin removal. Structure exposed. Every decision visible.'],
  ['04', 'REBUILD', 'Paint, corrosion, manufacture, material and identity.'],
  ['05', 'COMPLETION', 'One aircraft. One point of view. Nothing incidental.'],
]

export default function SckExperience() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const root = document.querySelector('.sck-experience')
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-intro]', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, stagger: 0.07, ease: 'power4.out', delay: 0.5 })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
        gsap.fromTo(item, { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 84%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
        gsap.fromTo(line, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 88%', once: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="sck-experience">
      <SckWebGLScene />
      <div className="sck-loading" aria-hidden="true">
        <video src="/media/video/loading.mp4" autoPlay muted playsInline preload="auto" />
        <div className="sck-loading__label">ALIGNING DETAILS...</div>
      </div>

      <section className="sck-screen sck-hero" id="top">
        <header className="sck-nav" data-intro>
          <a className="sck-logo" href="#top">SCK</a>
          <nav>
            <a href="#aircraft">AIRCRAFT</a><a href="#atelier">ATELIER</a><a href="#projects">PROJECTS</a><a href="#journal">JOURNAL</a><a href="#access">ACCESS</a>
          </nav>
          <a className="sck-nav__mobile" href="#access">ACCESS ↗</a>
        </header>

        <div className="sck-hero__content">
          <p className="sck-kicker" data-intro>SCK AVIATION / VIENNA</p>
          <h1 data-intro>ATTITUDE<br />WITH<br />ALTITUDE.</h1>
          <p className="sck-hero__sub" data-intro>THE AIRCRAFT IS THE OBJECT. THE EXPERIENCE IS THE POINT OF VIEW.</p>
          <a className="sck-link" data-intro href="#aircraft"><span>ENTER THE EXPERIENCE</span><b>↘</b></a>
        </div>
        <div className="sck-hero__hud" data-intro><span>48°12′N / 16°22′E</span><span>WEBGL FLIGHT SYSTEM / 01</span><span>SCROLL TO FLY ↓</span></div>
      </section>

      <section className="sck-screen sck-statement" id="statement">
        <div className="sck-statement__left" data-reveal><span className="sck-index">01 / THE POINT OF VIEW</span></div>
        <div className="sck-statement__main">
          <p className="sck-kicker" data-reveal>BEYOND THE EXPECTED</p>
          <h2 data-reveal>AVIATION<br />WITHOUT<br /><em>COMPROMISE.</em></h2>
          <div className="sck-rule" data-line />
          <p className="sck-body" data-reveal>Aircraft transformation, design and special projects.<br />Built around an uncompromising point of view.</p>
        </div>
      </section>

      <section className="sck-screen sck-aircraft" id="aircraft">
        <div className="sck-aircraft__top"><span className="sck-index" data-reveal>02 / OE-LSC — BLACK STAR</span><span className="sck-index">LIVE OBJECT / 3D</span></div>
        <div className="sck-aircraft__title"><h2 data-reveal>ATTITUDE,<br /><em>ELEVATED.</em></h2></div>
        <div className="sck-aircraft__copy" data-reveal><p>A transformation conceived as a complete object.</p><p>Exterior. Interior. Detail. Identity.</p><a className="sck-link" href="#materials"><span>EXPLORE THE OBJECT</span><b>↗</b></a></div>
        <div className="sck-aircraft__readout"><span>OE-LSC</span><span>GULFSTREAM / BLACK STAR</span><span>01 — 04</span></div>
      </section>

      <section className="sck-screen sck-materials" id="materials">
        <div className="sck-section-head"><span className="sck-index" data-reveal>03 / MATERIAL STUDIES</span><p data-reveal>MATERIAL IS NOT DECORATION.<br />IT IS PROOF.</p></div>
        <div className="sck-material-grid">
          {materials.map(([number, title, copy]) => (
            <article className="sck-material" key={number} data-reveal><span>{number}</span><div className="sck-material__orb" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p><b>INSPECT DETAIL ↗</b></article>
          ))}
        </div>
      </section>

      <section className="sck-screen sck-atelier" id="atelier">
        <div className="sck-atelier__intro"><span className="sck-index" data-reveal>04 / ATELIER</span><p className="sck-kicker" data-reveal>MISSION IMPOSSIBLE</p><h2 data-reveal>WE OPERATE<br />WITHIN THE<br /><em>IMPOSSIBLE.</em></h2><p className="sck-body" data-reveal>Complexity is where the work becomes visible.</p></div>
        <div className="sck-process">{process.map(([number, title, copy]) => <div className="sck-process__row" key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>+</i></div>)}</div>
      </section>

      {/* The two intentional non-3D editorial interruptions: film + award proof. */}
      <section className="sck-film" aria-label="Mission Impossible film">
        <video src="/media/video/mission-impossible.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="sck-film__overlay" /><div className="sck-film__caption"><span>05 / THE PROCESS / FILM</span><strong>15 WEEKS.<br />ONE COMPLETE OBJECT.</strong><small>MISSION / IMPOSSIBLE — PRODUCTION</small></div>
      </section>

      <section className="sck-screen sck-projects" id="projects">
        <div className="sck-projects__intro"><span className="sck-index" data-reveal>06 / PROJECTS</span><h2 data-reveal>WORK THAT<br /><em>LEAVES THE HANGAR.</em></h2><p data-reveal>Aircraft productions. Special projects. Selective charter. The 3D world becomes the portfolio wall.</p></div>
        <div className="sck-project-orbit" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span></div>
        <div className="sck-projects__footer"><span>SCROLL / ROTATE / DISCOVER</span><a href="#access">VIEW THE WORK ↗</a></div>
      </section>

      <section className="sck-proof" aria-label="Awards and recognition">
        <div className="sck-proof__mark">AWARD<br />/ PROOF</div><div className="sck-proof__main"><span className="sck-index">07 / EXTERNAL VALIDATION</span><h2>THE WORK<br />SPEAKS<br /><em>OUTSIDE.</em></h2><div className="sck-proof__facts"><div><strong>2024</strong><span>INTERNATIONAL YACHT &amp; AVIATION AWARDS</span></div><div><strong>2023</strong><span>EBACE / GENEVA</span></div><div><strong>OE-LSC</strong><span>GULFSTREAM / BLACK STAR</span></div></div><p className="sck-proof__note">Selected awards, events, partners and credits should be verified against final publication sources before launch.</p></div>
      </section>

      <section className="sck-screen sck-journal" id="journal">
        <div className="sck-journal__head"><span className="sck-index" data-reveal>08 / JOURNAL — ATTITUDE</span><h2 data-reveal>DETAILS<br />WORTH<br /><em>NOTICING.</em></h2></div>
        <div className="sck-journal__cards"><article data-reveal><span>01 / MATERIAL</span><h3>WHY BLACK<br />IS NEVER JUST BLACK.</h3><a href="#materials">READ ↗</a></article><article data-reveal><span>02 / PROCESS</span><h3>ONE DAY<br />BEFORE ARRIVAL.</h3><a href="#atelier">READ ↗</a></article><article data-reveal><span>03 / ATTITUDE</span><h3>THE WORLD<br />BEYOND BEIGE.</h3><a href="#access">READ ↗</a></article></div>
      </section>

      <section className="sck-screen sck-access" id="access">
        <div className="sck-access__intro"><span className="sck-index" data-reveal>09 / ACCESS</span><p className="sck-kicker" data-reveal>EXPERIENCE OUR ATTITUDE. SELECTIVELY.</p><h2 data-reveal>LET'S BUILD<br /><em>THE UNEXPECTED.</em></h2><p data-reveal>For aircraft transformation, design, production and special projects.</p></div>
        <form className="sck-form" onSubmit={handleSubmit}>
          <label>PROJECT TYPE<select required defaultValue=""><option value="" disabled>Select project</option><option>Aircraft transformation</option><option>Special project / production</option><option>Design collaboration</option><option>Selective charter</option></select></label>
          <label>TIMELINE<input required placeholder="When are you looking to begin?" /></label><label>NAME<input required placeholder="Your name" /></label><label>EMAIL<input required type="email" placeholder="you@company.com" /></label><label>MESSAGE<textarea required placeholder="Tell us what you're building." rows={4} /></label>
          <button type="submit"><span>{submitted ? 'INQUIRY RECEIVED' : 'REQUEST ACCESS'}</span><b>↗</b></button><small>By submitting, you agree to be contacted regarding your inquiry.</small>
        </form>
      </section>

      <footer className="sck-footer"><a className="sck-logo" href="#top">SCK</a><div><span>VIENNA / AUSTRIA</span><span>AVIATION / DESIGN / SPECIAL PROJECTS</span></div><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  )
}
