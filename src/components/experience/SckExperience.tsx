'use client'

import { FormEvent, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SckWebGLScene from './SckWebGLScene'

gsap.registerPlugin(ScrollTrigger)

const materials = [
  ['01', 'MATTE BLACK', 'A surface treated as attitude.'],
  ['02', 'PORTORO', 'Stone selected for its movement and depth.'],
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

const projects = [
  {
    index: '01',
    title: 'MISSION / IMPOSSIBLE',
    type: 'PRODUCTION / AVIATION',
    media: '/media/video/mission-impossible.mp4',
  },
  {
    index: '02',
    title: 'AIRCRAFT / IN MOTION',
    type: 'SPECIAL PROJECT',
    media: '/media/video/charter.mp4',
  },
  {
    index: '03',
    title: 'DETAIL / BECOMES IDENTITY',
    type: 'DESIGN / ATELIER',
    media: '/media/atelier/facetune-26.jpg',
  },
]

export default function SckExperience() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const root = document.querySelector('.sck-experience')
    if (!root) return

    const ctx = gsap.context(() => {
      const introItems = gsap.utils.toArray<HTMLElement>('[data-intro]')
      gsap.fromTo(
        introItems,
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.55,
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-image]').forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )
      })

      const hero = document.querySelector<HTMLElement>('.sck-hero')
      if (hero) {
        gsap.to(hero.querySelector('.sck-hero__media'), {
          yPercent: 8,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 88%', once: true },
          },
        )
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
      <div className="sck-loading" aria-hidden="true">
        <video src="/media/video/loading.mp4" autoPlay muted playsInline preload="auto" />
        <div className="sck-loading__label">ALIGNING DETAILS...</div>
      </div>

      <section className="sck-hero" id="top">
        <SckWebGLScene />
        <div className="sck-hero__media" data-image>
          <img src="/media/aircraft/oe-lsc.jpg" alt="OE-LSC aircraft" />
        </div>
        <div className="sck-hero__wash" />
        <div className="sck-grain" />

        <header className="sck-nav" data-intro>
          <a className="sck-logo" href="#top">SCK</a>
          <nav>
            <a href="#aircraft">AIRCRAFT</a>
            <a href="#atelier">ATELIER</a>
            <a href="#projects">PROJECTS</a>
            <a href="#journal">JOURNAL</a>
            <a href="#access">ACCESS</a>
          </nav>
          <a className="sck-nav__mobile" href="#access">ACCESS ↗</a>
        </header>

        <div className="sck-hero__content">
          <p className="sck-kicker" data-intro>SCK AVIATION</p>
          <h1 data-intro>ATTITUDE<br />WITH<br />ALTITUDE.</h1>
          <p className="sck-hero__sub" data-intro>EXPERIENCE OUR ATTITUDE. SELECTIVELY.</p>
          <a className="sck-link" data-intro href="#access"><span>REQUEST ACCESS</span><b>↗</b></a>
        </div>

        <div className="sck-hero__bottom" data-intro>
          <span>VIENNA / AUSTRIA</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>01 — 08</span>
        </div>
      </section>

      <section className="sck-statement section-dark">
        <div className="sck-statement__left" data-reveal>
          <span className="sck-index">01 / THE POINT OF VIEW</span>
        </div>
        <div className="sck-statement__main">
          <p className="sck-kicker" data-reveal>BEYOND THE EXPECTED</p>
          <h2 data-reveal>AVIATION<br />WITHOUT<br />COMPROMISE.</h2>
          <div className="sck-rule" data-line />
          <p className="sck-body" data-reveal>
            Aircraft transformation, design and special projects.<br />
            Built around an uncompromising point of view.
          </p>
        </div>
      </section>

      <section className="sck-aircraft" id="aircraft">
        <div className="sck-aircraft__visual">
          <img data-image src="/media/aircraft/oe-lsc.jpg" alt="OE-LSC Gulfstream aircraft" />
          <div className="sck-aircraft__shade" />
        </div>
        <div className="sck-aircraft__overlay">
          <div>
            <span className="sck-index" data-reveal>02 / OE-LSC — BLACK STAR</span>
            <h2 data-reveal>ATTITUDE,<br />ELEVATED.</h2>
          </div>
          <div className="sck-aircraft__copy" data-reveal>
            <p>A transformation conceived as a complete object.</p>
            <p>Exterior. Interior. Detail. Identity.</p>
            <a className="sck-link" href="#materials"><span>ENTER THE AIRCRAFT</span><b>↗</b></a>
          </div>
        </div>
        <div className="sck-aircraft__coords">48°12′N / 16°22′E</div>
      </section>

      <section className="sck-materials section-light" id="materials">
        <div className="sck-section-head">
          <span className="sck-index">03 / MATERIAL STUDIES</span>
          <p>Material is not decoration.<br />It is proof.</p>
        </div>
        <div className="sck-material-grid">
          {materials.map(([number, title, copy]) => (
            <article className="sck-material" key={number} data-reveal>
              <span>{number}</span>
              <div className="sck-material__swatch" aria-hidden="true"><i /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b>INSPECT DETAIL ↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="sck-atelier" id="atelier">
        <div className="sck-atelier__intro">
          <span className="sck-index" data-reveal>04 / ATELIER</span>
          <p className="sck-kicker" data-reveal>MISSION IMPOSSIBLE</p>
          <h2 data-reveal>WE OPERATE<br />WITHIN THE<br /><em>IMPOSSIBLE.</em></h2>
          <p className="sck-body" data-reveal>Complexity is where the work becomes visible.</p>
        </div>
        <div className="sck-process">
          {process.map(([number, title, copy]) => (
            <div className="sck-process__row" key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i>+</i>
            </div>
          ))}
        </div>
      </section>

      <section className="sck-film" aria-label="Atelier film">
        <video src="/media/video/mission-impossible.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="sck-film__overlay" />
        <div className="sck-film__caption">
          <span>05 / THE PROCESS</span>
          <strong>15 WEEKS.<br />ONE COMPLETE OBJECT.</strong>
          <small>PROCESS / PAINT / MATERIAL / MANUFACTURE</small>
        </div>
      </section>

      <section className="sck-projects section-dark" id="projects">
        <div className="sck-section-head sck-section-head--dark">
          <span className="sck-index">06 / PROJECTS</span>
          <p>Aircraft. Productions.<br />Automotive crossover.<br />Selective charter.</p>
        </div>
        <div className="sck-project-list">
          {projects.map((project) => (
            <article className="sck-project" key={project.index} data-reveal>
              <div className="sck-project__media">
                {project.media.endsWith('.mp4') ? (
                  <video src={project.media} autoPlay muted loop playsInline preload="metadata" />
                ) : (
                  <img src={project.media} alt={project.title} />
                )}
                <span>{project.index}</span>
              </div>
              <div className="sck-project__info">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <a href="#access">VIEW PROJECT ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sck-proof section-light">
        <div className="sck-proof__mark" data-reveal>AWARD<br />/ PROOF</div>
        <div className="sck-proof__main">
          <span className="sck-index" data-reveal>07 / EXTERNAL VALIDATION</span>
          <h2 data-reveal>THE WORK<br />SPEAKS<br /><em>OUTSIDE.</em></h2>
          <div className="sck-proof__facts" data-reveal>
            <div><strong>2024</strong><span>INTERNATIONAL YACHT &amp; AVIATION AWARDS</span></div>
            <div><strong>2023</strong><span>EBACE / GENEVA</span></div>
            <div><strong>OE-LSC</strong><span>GULFSTREAM / BLACK STAR</span></div>
          </div>
          <p className="sck-proof__note">Selected awards, events, partners and credits should be verified against final publication sources before launch.</p>
        </div>
      </section>

      <section className="sck-journal section-dark" id="journal">
        <div className="sck-journal__head">
          <span className="sck-index">08 / JOURNAL — ATTITUDE</span>
          <h2>DETAILS<br />WORTH<br /><em>NOTICING.</em></h2>
        </div>
        <div className="sck-journal__cards">
          <article data-reveal><span>01 / MATERIAL</span><h3>WHY BLACK<br />IS NEVER JUST BLACK.</h3><a href="#materials">READ ↗</a></article>
          <article data-reveal><span>02 / PROCESS</span><h3>ONE DAY<br />BEFORE ARRIVAL.</h3><a href="#atelier">READ ↗</a></article>
          <article data-reveal><span>03 / ATTITUDE</span><h3>THE WORLD<br />BEYOND BEIGE.</h3><a href="#access">READ ↗</a></article>
        </div>
      </section>

      <section className="sck-access" id="access">
        <div className="sck-access__intro">
          <span className="sck-index" data-reveal>09 / ACCESS</span>
          <p className="sck-kicker" data-reveal>EXPERIENCE OUR ATTITUDE. SELECTIVELY.</p>
          <h2 data-reveal>LET'S BUILD<br /><em>THE UNEXPECTED.</em></h2>
          <p data-reveal>For aircraft transformation, design, production and special projects.</p>
        </div>
        <form className="sck-form" onSubmit={handleSubmit}>
          <label>PROJECT TYPE<select required defaultValue=""><option value="" disabled>Select project</option><option>Aircraft transformation</option><option>Special project / production</option><option>Design collaboration</option><option>Selective charter</option></select></label>
          <label>TIMELINE<input required placeholder="When are you looking to begin?" /></label>
          <label>NAME<input required placeholder="Your name" /></label>
          <label>EMAIL<input required type="email" placeholder="you@company.com" /></label>
          <label>MESSAGE<textarea required placeholder="Tell us what you're building." rows={4} /></label>
          <button type="submit"><span>{submitted ? 'INQUIRY RECEIVED' : 'REQUEST ACCESS'}</span><b>↗</b></button>
          <small>By submitting, you agree to be contacted regarding your inquiry.</small>
        </form>
      </section>

      <footer className="sck-footer">
        <a className="sck-logo" href="#top">SCK</a>
        <div><span>VIENNA / AUSTRIA</span><span>AVIATION / DESIGN / SPECIAL PROJECTS</span></div>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  )
}
