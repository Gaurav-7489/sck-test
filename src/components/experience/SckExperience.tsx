'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SckExperience() {
  const rootRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const loadingVideoRef = useRef<HTMLVideoElement>(null)

  const heroRef = useRef<HTMLElement>(null)
  const aircraftRef = useRef<HTMLImageElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)

  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const statementRef = useRef<HTMLElement>(null)
  const statementSmallRef = useRef<HTMLParagraphElement>(null)
  const statementTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const loading = loadingRef.current
    const loadingVideo = loadingVideoRef.current
    const hero = heroRef.current
    const aircraft = aircraftRef.current
    const atmosphere = atmosphereRef.current

    const eyebrow = eyebrowRef.current
    const title = titleRef.current
    const sub = subRef.current
    const cta = ctaRef.current

    const statement = statementRef.current
    const statementSmall = statementSmallRef.current
    const statementTitle = statementTitleRef.current

    if (
      !loading ||
      !hero ||
      !aircraft ||
      !atmosphere ||
      !eyebrow ||
      !title ||
      !sub ||
      !cta ||
      !statement ||
      !statementSmall ||
      !statementTitle
    ) {
      return
    }

    const context = gsap.context(() => {
      /*
       * OPENING FILM
       */

      gsap.set(loading, {
        opacity: 1,
      })

      gsap.set(hero, {
        opacity: 1,
      })

      gsap.set(atmosphere, {
        opacity: 0,
      })

      gsap.set(aircraft, {
        opacity: 0,
        scale: 1.12,
        filter: 'blur(16px)',
        x: 0,
      })

      gsap.set([eyebrow, title, sub, cta], {
        opacity: 0,
        y: 28,
      })

      const intro = gsap.timeline({
        delay: 0.2,
        defaults: {
          ease: 'power3.out',
        },
      })

      intro
        .to(atmosphere, {
          opacity: 1,
          duration: 1.8,
        })
        .to(
          aircraft,
          {
            opacity: 1,
            scale: 1.025,
            filter: 'blur(0px)',
            duration: 3.4,
            ease: 'power2.out',
          },
          '-=1.1',
        )
        .to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          '-=1.8',
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.4',
        )
        .to(
          sub,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          '-=0.5',
        )
        .to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          '-=0.35',
        )

      /*
       * LOADING FILM FADES AWAY.
       * If the browser cannot autoplay the video,
       * the page still continues normally.
       */

      const dismissLoading = () => {
        gsap.to(loading, {
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            loading.style.pointerEvents = 'none'
          },
        })
      }

      if (loadingVideo) {
        loadingVideo.addEventListener('ended', dismissLoading, {
          once: true,
        })

        window.setTimeout(dismissLoading, 2200)
      } else {
        window.setTimeout(dismissLoading, 1000)
      }

      /*
       * SUBTLE AIRCRAFT BREATHING MOVEMENT
       */

      gsap.to(aircraft, {
        scale: 1.055,
        x: 10,
        duration: 11,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      /*
       * SCENE 01 → SCENE 02
       *
       * The hero behaves like a camera shot.
       */

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=130%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })

      heroTimeline
        .to(
          aircraft,
          {
            scale: 1.18,
            x: 55,
            yPercent: -4,
            opacity: 0.22,
            filter: 'blur(2px)',
            ease: 'none',
          },
          0,
        )
        .to(
          atmosphere,
          {
            scale: 1.25,
            opacity: 0.3,
            ease: 'none',
          },
          0,
        )
        .to(
          [eyebrow, title, sub, cta],
          {
            y: -70,
            opacity: 0,
            stagger: 0.035,
            ease: 'none',
          },
          0.08,
        )

      /*
       * SCENE 02 — EDITORIAL STATEMENT
       */

      gsap.set(statementSmall, {
        opacity: 0,
        y: 30,
      })

      gsap.set(statementTitle, {
        opacity: 0,
        y: 70,
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: statement,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
        },
      })
        .to(statementSmall, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'none',
        })
        .to(
          statementTitle,
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'none',
          },
          '-=0.6',
        )
    }, root)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <main ref={rootRef} className="sck-experience">
      {/* LOADING FILM */}

      <div ref={loadingRef} className="sck-loading">
        <video
          ref={loadingVideoRef}
          src="/media/video/loading.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />

        <div className="sck-loading__label">
          <span>ALIGNING DETAILS...</span>
        </div>
      </div>

      {/* SCENE 01 */}

      <section ref={heroRef} className="sck-hero">
        <div ref={atmosphereRef} className="sck-hero__atmosphere" />

        <div className="sck-hero__image">
          <img
            ref={aircraftRef}
            src="/media/aircraft/oe-lsc.jpg"
            alt="OE-LSC aircraft"
          />
        </div>

        <div className="sck-hero__shade" />

        <header className="sck-hero__nav">
          <a href="/" className="sck-wordmark">
            SCK
          </a>

          <nav>
            <a href="#aircraft">AIRCRAFT</a>
            <a href="#atelier">ATELIER</a>
            <a href="#projects">PROJECTS</a>
            <a href="#journal">JOURNAL</a>
            <a href="#access">ACCESS</a>
          </nav>
        </header>

        <section className="sck-hero__content">
          <p ref={eyebrowRef} className="sck-hero__eyebrow">
            SCK AVIATION
          </p>

          <h1 ref={titleRef}>
            ATTITUDE
            <br />
            WITH
            <br />
            ALTITUDE.
          </h1>

          <p ref={subRef} className="sck-hero__sub">
            EXPERIENCE OUR ATTITUDE. SELECTIVELY.
          </p>

          <a ref={ctaRef} href="#access" className="sck-hero__cta">
            REQUEST ACCESS
            <span>↗</span>
          </a>
        </section>

        <div className="sck-hero__scroll">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      {/* SCENE 02 */}

      <section ref={statementRef} className="sck-statement">
        <div className="sck-statement__inner">
          <p ref={statementSmallRef} className="sck-statement__eyebrow">
            BEYOND THE EXPECTED
          </p>

          <h2 ref={statementTitleRef}>
            AVIATION
            <br />
            WITHOUT
            <br />
            COMPROMISE.
          </h2>

          <div className="sck-statement__line" />

          <p className="sck-statement__copy">
            Aircraft transformation, design and special projects.
            <br />
            Built around an uncompromising point of view.
          </p>
        </div>
      </section>
    </main>
  )
}
