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
  const heroImageRef = useRef<HTMLDivElement>(null)
  const aircraftRef = useRef<HTMLImageElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)

  const navRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const statementRef = useRef<HTMLElement>(null)
  const statementSmallRef = useRef<HTMLParagraphElement>(null)
  const statementTitleRef = useRef<HTMLHeadingElement>(null)
  const statementCopyRef = useRef<HTMLParagraphElement>(null)

  const aircraftSectionRef = useRef<HTMLElement>(null)
  const aircraftSectionImageRef = useRef<HTMLImageElement>(null)
  const aircraftMetaRef = useRef<HTMLDivElement>(null)
  const aircraftLabelRef = useRef<HTMLParagraphElement>(null)
  const aircraftTitleRef = useRef<HTMLHeadingElement>(null)
  const aircraftCopyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const loading = loadingRef.current
    const loadingVideo = loadingVideoRef.current

    const hero = heroRef.current
    const heroImage = heroImageRef.current
    const aircraft = aircraftRef.current
    const atmosphere = atmosphereRef.current
    const grain = grainRef.current

    const nav = navRef.current
    const eyebrow = eyebrowRef.current
    const title = titleRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const scroll = scrollRef.current

    const statement = statementRef.current
    const statementSmall = statementSmallRef.current
    const statementTitle = statementTitleRef.current
    const statementCopy = statementCopyRef.current

    const aircraftSection = aircraftSectionRef.current
    const aircraftSectionImage = aircraftSectionImageRef.current
    const aircraftMeta = aircraftMetaRef.current
    const aircraftLabel = aircraftLabelRef.current
    const aircraftTitle = aircraftTitleRef.current
    const aircraftCopy = aircraftCopyRef.current

    if (
      !root ||
      !loading ||
      !hero ||
      !heroImage ||
      !aircraft ||
      !atmosphere ||
      !grain ||
      !nav ||
      !eyebrow ||
      !title ||
      !sub ||
      !cta ||
      !scroll ||
      !statement ||
      !statementSmall ||
      !statementTitle ||
      !statementCopy ||
      !aircraftSection ||
      !aircraftSectionImage ||
      !aircraftMeta ||
      !aircraftLabel ||
      !aircraftTitle ||
      !aircraftCopy
    ) {
      return
    }

    const context = gsap.context(() => {
      /* ---------------------------------------------
         INITIAL STATES
      --------------------------------------------- */

      gsap.set(loading, {
        opacity: 1,
        visibility: 'visible',
      })

      gsap.set(heroImage, {
        scale: 1.08,
      })

      gsap.set(atmosphere, {
        opacity: 0,
        scale: 0.95,
      })

      gsap.set(aircraft, {
        opacity: 0,
        scale: 1.14,
        xPercent: 4,
        filter: 'blur(18px) saturate(0.7)',
      })

      gsap.set(nav, {
        opacity: 0,
        y: -15,
      })

      gsap.set([eyebrow, title, sub, cta, scroll], {
        opacity: 0,
        y: 30,
      })

      gsap.set(grain, {
        opacity: 0,
      })

      /* ---------------------------------------------
         OPENING
      --------------------------------------------- */

      const intro = gsap.timeline({
        delay: 0.15,
        defaults: {
          ease: 'power3.out',
        },
      })

      intro
        .to(atmosphere, {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        })
        .to(
          grain,
          {
            opacity: 0.16,
            duration: 1.5,
          },
          '-=1.5',
        )
        .to(
          aircraft,
          {
            opacity: 1,
            scale: 1,
            xPercent: 0,
            filter: 'blur(0px) saturate(1)',
            duration: 3.2,
            ease: 'power2.out',
          },
          '-=1.2',
        )
        .to(
          nav,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          '-=2',
        )
        .to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=1.8',
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power4.out',
          },
          '-=0.45',
        )
        .to(
          sub,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.55',
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
        .to(
          scroll,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.25',
        )

      /* ---------------------------------------------
         LOADING FILM
      --------------------------------------------- */

      let loadingDismissed = false

      const dismissLoading = () => {
        if (loadingDismissed) return

        loadingDismissed = true

        gsap.to(loading, {
          opacity: 0,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            loading.style.visibility = 'hidden'
            loading.style.pointerEvents = 'none'
          },
        })
      }

      if (loadingVideo) {
        loadingVideo.addEventListener('ended', dismissLoading, {
          once: true,
        })

        window.setTimeout(dismissLoading, 2600)
      } else {
        window.setTimeout(dismissLoading, 900)
      }

      /* ---------------------------------------------
         AIRCRAFT BREATHING
      --------------------------------------------- */

      const breathing = gsap.to(aircraft, {
        scale: 1.025,
        xPercent: -0.6,
        duration: 9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      /* ---------------------------------------------
         HERO SCROLL CAMERA
      --------------------------------------------- */

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=140%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })

      heroTimeline
        .to(
          heroImage,
          {
            scale: 1.18,
            ease: 'none',
          },
          0,
        )
        .to(
          aircraft,
          {
            scale: 1.18,
            xPercent: 10,
            yPercent: -5,
            opacity: 0.18,
            filter: 'blur(2px) saturate(0.75)',
            ease: 'none',
          },
          0,
        )
        .to(
          atmosphere,
          {
            scale: 1.4,
            opacity: 0.32,
            ease: 'none',
          },
          0,
        )
        .to(
          nav,
          {
            y: -35,
            opacity: 0,
            ease: 'none',
          },
          0,
        )
        .to(
          [eyebrow, title, sub, cta],
          {
            y: -100,
            opacity: 0,
            stagger: 0.035,
            ease: 'none',
          },
          0.08,
        )
        .to(
          scroll,
          {
            opacity: 0,
            ease: 'none',
          },
          0.1,
        )
        .to(
          grain,
          {
            opacity: 0.28,
            ease: 'none',
          },
          0.2,
        )

      /* ---------------------------------------------
         STATEMENT
      --------------------------------------------- */

      gsap.set(statementSmall, {
        opacity: 0,
        y: 35,
      })

      gsap.set(statementTitle, {
        opacity: 0,
        y: 80,
      })

      gsap.set(statementCopy, {
        opacity: 0,
        y: 35,
      })

      const statementTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: statement,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      statementTimeline
        .to(statementSmall, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'none',
        })
        .to(
          statementTitle,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'none',
          },
          '-=0.4',
        )
        .to(
          statementCopy,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'none',
          },
          '-=0.45',
        )

      /* ---------------------------------------------
         OE-LSC / AIRCRAFT SCENE
      --------------------------------------------- */

      gsap.set(aircraftSectionImage, {
        scale: 1.16,
        opacity: 0.25,
      })

      gsap.set(aircraftLabel, {
        opacity: 0,
        y: 30,
      })

      gsap.set(aircraftTitle, {
        opacity: 0,
        y: 70,
      })

      gsap.set(aircraftCopy, {
        opacity: 0,
        y: 35,
      })

      gsap.set(aircraftMeta, {
        opacity: 0,
        y: 30,
      })

      const aircraftTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: aircraftSection,
          start: 'top 80%',
          end: 'bottom 25%',
          scrub: 1.1,
        },
      })

      aircraftTimeline
        .to(
          aircraftSectionImage,
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            duration: 1.5,
          },
          0,
        )
        .to(
          aircraftLabel,
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            duration: 0.8,
          },
          0.15,
        )
        .to(
          aircraftTitle,
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            duration: 1,
          },
          0.25,
        )
        .to(
          aircraftCopy,
          {
            opacity: 0.72,
            y: 0,
            ease: 'none',
            duration: 0.8,
          },
          0.4,
        )
        .to(
          aircraftMeta,
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            duration: 0.8,
          },
          0.55,
        )

      /* ---------------------------------------------
         MOUSE CAMERA MOVEMENT
      --------------------------------------------- */

      const onPointerMove = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5

        gsap.to(atmosphere, {
          x: x * 30,
          y: y * 20,
          duration: 1.8,
          ease: 'power3.out',
          overwrite: true,
        })

        gsap.to(heroImage, {
          x: x * -12,
          y: y * -7,
          duration: 1.8,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      window.addEventListener('pointermove', onPointerMove)

      /* ---------------------------------------------
         CLEANUP
      --------------------------------------------- */

      return () => {
        breathing.kill()
        window.removeEventListener('pointermove', onPointerMove)
      }
    }, root)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <main ref={rootRef} className="sck-experience">

      {/* LOADING */}

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

      {/* HERO */}

      <section ref={heroRef} className="sck-hero">

        <div
          ref={atmosphereRef}
          className="sck-hero__atmosphere"
        />

        <div
          ref={heroImageRef}
          className="sck-hero__image"
        >
          <img
            ref={aircraftRef}
            src="/media/aircraft/oe-lsc.jpg"
            alt="OE-LSC aircraft"
          />
        </div>

        <div className="sck-hero__shade" />

        <div
          ref={grainRef}
          className="sck-hero__grain"
        />

        <header
          ref={navRef}
          className="sck-hero__nav"
        >
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

          <p
            ref={eyebrowRef}
            className="sck-hero__eyebrow"
          >
            SCK AVIATION
          </p>

          <h1 ref={titleRef}>
            ATTITUDE
            <br />
            WITH
            <br />
            ALTITUDE.
          </h1>

          <p
            ref={subRef}
            className="sck-hero__sub"
          >
            EXPERIENCE OUR ATTITUDE. SELECTIVELY.
          </p>

          <a
            ref={ctaRef}
            href="#access"
            className="sck-hero__cta"
          >
            REQUEST ACCESS
            <span>↗</span>
          </a>

        </section>

        <div
          ref={scrollRef}
          className="sck-hero__scroll"
        >
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>

      </section>

      {/* STATEMENT */}

      <section
        ref={statementRef}
        className="sck-statement"
      >
        <div className="sck-statement__inner">

          <p
            ref={statementSmallRef}
            className="sck-statement__eyebrow"
          >
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

          <p
            ref={statementCopyRef}
            className="sck-statement__copy"
          >
            Aircraft transformation, design and special projects.
            <br />
            Built around an uncompromising point of view.
          </p>

        </div>
      </section>

      {/* OE-LSC */}

      <section
        id="aircraft"
        ref={aircraftSectionRef}
        className="sck-aircraft"
      >

        <div className="sck-aircraft__visual">
          <img
            ref={aircraftSectionImageRef}
            src="/media/aircraft/oe-lsc.jpg"
            alt="OE-LSC — SCK Aviation"
          />

          <div className="sck-aircraft__shade" />
        </div>

        <div className="sck-aircraft__content">

          <p
            ref={aircraftLabelRef}
            className="sck-aircraft__eyebrow"
          >
            OE-LSC / GULFSTREAM
          </p>

          <h2 ref={aircraftTitleRef}>
            ATTITUDE,
            <br />
            ELEVATED.
          </h2>

          <p
            ref={aircraftCopyRef}
            className="sck-aircraft__copy"
          >
            A transformation conceived as a complete object.
            <br />
            Exterior. Interior. Detail. Identity.
          </p>

          <div
            ref={aircraftMetaRef}
            className="sck-aircraft__meta"
          >
            <span>01</span>
            <span>THE AIRCRAFT</span>
            <span>EXPLORE ↗</span>
          </div>

        </div>

      </section>

    </main>
  )
}
