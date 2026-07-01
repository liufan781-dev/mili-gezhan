import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const smoothEase = 'power4.out'

export default function useSiteMotion(enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return undefined

    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lightweightMotion = window.innerWidth <= 760 || navigator.connection?.saveData
    root.classList.add('motion-ready')

    if (reducedMotion) {
      root.classList.add('motion-reduced')
      return () => {
        root.classList.remove('motion-ready', 'motion-reduced')
      }
    }

    const context = gsap.context(() => {
      gsap.set('.reveal', { autoAlpha: 1, y: 0 })

      const playOpening = !window.location.hash || window.location.hash === '#home'

      if (!playOpening) {
        gsap.set('.hero-opening', { display: 'none' })
      } else {
        const opening = gsap.timeline({
          defaults: { ease: smoothEase },
          onComplete: () => {
            gsap.set('.hero-opening', { display: 'none' })
            ScrollTrigger.refresh()
          },
        })

        opening
        .set('.hero-opening', { display: 'grid' })
        .fromTo(
          '.hero-opening-copy',
          { autoAlpha: 0, y: 32, scaleX: 0.82 },
          { autoAlpha: 1, y: 0, scaleX: 1, duration: 0.9 },
        )
        .fromTo(
          '.hero-opening-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: 'expo.inOut' },
          '-=0.54',
        )
        .to('.hero-opening-copy', { autoAlpha: 0, y: -22, duration: 0.48 }, '+=0.2')
        .to(
          '.hero-opening',
          { yPercent: -102, duration: 1.05, ease: 'power4.inOut' },
          '-=0.16',
        )
        .fromTo(
          '.nav-wrap',
          { autoAlpha: 0, y: -28 },
          { autoAlpha: 1, y: 0, duration: 0.82, clearProps: 'transform,opacity,visibility' },
          '-=0.6',
        )
        .fromTo(
          '.hero-heading h1',
          {
            autoAlpha: 0,
            yPercent: 115,
            scaleX: 0.7,
            clipPath: 'inset(0 0 100% 0)',
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            scaleX: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.25,
            ease: 'expo.out',
            clearProps: 'transform,opacity,visibility,clipPath',
          },
          '-=0.68',
        )
        .fromTo(
          '.hero-heading p',
          { autoAlpha: 0, y: 34, letterSpacing: '0.12em' },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: '0em',
            duration: 0.9,
            clearProps: 'transform,opacity,visibility,letterSpacing',
          },
          '-=0.82',
        )
        .fromTo(
          '.hero-person',
          {
            autoAlpha: 0,
            y: 88,
            scale: 0.88,
            clipPath: 'inset(18% 8% 22% 8% round 54px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 54px)',
            duration: 1.18,
            ease: 'power4.out',
            clearProps: 'transform,opacity,visibility,clipPath',
          },
          '-=0.8',
        )
        .fromTo(
          ['.hero-description', '.hero-button', '.hero-index'],
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            stagger: 0.1,
            clearProps: 'transform,opacity,visibility',
          },
          '-=0.72',
        )
        .fromTo(
          '.hero-marquee',
          { autoAlpha: 0, scaleX: 0.86 },
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 1.05,
            clearProps: 'transform,opacity,visibility',
          },
          '-=0.95',
        )
      }

      const revealHeading = (containerSelector, titleSelector = 'h2') => {
        const container = document.querySelector(containerSelector)
        const title = container?.querySelector(titleSelector)
        if (!container || !title) return

        const supporting = [...container.children].filter(child => child !== title)
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        })

        timeline.fromTo(
            title,
            {
              autoAlpha: 0,
              yPercent: 105,
              scaleX: 0.72,
              clipPath: 'inset(0 0 100% 0)',
              transformOrigin: 'left center',
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              scaleX: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.2,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )

        if (supporting.length) {
          timeline.fromTo(
            supporting,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.78,
              stagger: 0.08,
              ease: smoothEase,
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.72',
          )
        }
      }

      revealHeading('.about-heading')
      revealHeading('.strengths-title')
      revealHeading('.projects-heading')
      revealHeading('.featured-work-content')
      revealHeading('.key-frames .portfolio-block-heading', 'h3')
      revealHeading('.portfolio-workflow .portfolio-block-heading', 'h3')
      revealHeading('.contact-content')

      document.querySelectorAll('.about-card').forEach(card => {
        const content = card.querySelector('.about-card-content')
        const contentItems = content
          ? content.querySelectorAll('.about-card-meta, h3, .about-card-copy, .about-keywords')
          : []

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            once: true,
          },
        })

        timeline.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 105,
              scale: 0.955,
              clipPath: 'inset(10% 3% 4% 3% round 46px)',
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 46px)',
              duration: 1.05,
              ease: 'power4.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )

        if (contentItems.length) {
          timeline.fromTo(
            contentItems,
            { autoAlpha: 0, y: 38 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.76,
              stagger: 0.09,
              ease: smoothEase,
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.64',
          )
        }
      })

      const staggerGroup = (triggerSelector, itemSelector, options = {}) => {
        const trigger = document.querySelector(triggerSelector)
        const items = gsap.utils.toArray(itemSelector)
        if (!trigger || !items.length) return

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: options.y ?? 82,
            scale: options.scale ?? 0.965,
            clipPath: options.clipPath ?? 'inset(8% 0 12% 0 round 28px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0 round 28px)',
            duration: options.duration ?? 0.95,
            stagger: options.stagger ?? 0.11,
            ease: smoothEase,
            scrollTrigger: {
              trigger,
              start: options.start ?? 'top 78%',
              once: true,
            },
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform,opacity,visibility,clipPath' })
            },
          },
        )
      }

      staggerGroup('.strength-grid', '.strength-card', { y: 72, stagger: 0.1 })
      staggerGroup('.projects-cards', '.project-component', { y: 96, stagger: 0.16 })
      staggerGroup('.key-frame-track', '.key-frame-card', {
        y: 68,
        stagger: 0.12,
        clipPath: 'inset(18% 0 0% 0 round 16px)',
      })
      staggerGroup('.workflow-grid', '.workflow-item', {
        y: 54,
        stagger: 0.09,
        scale: 0.98,
        clipPath: 'inset(12% 0 0% 0 round 17px)',
      })

      gsap.fromTo(
        '.featured-work',
        {
          clipPath: 'inset(14% 7% 14% 7% round 30px)',
          scale: 0.97,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 30px)',
          scale: 1,
          duration: 1.35,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.featured-work',
            start: 'top 82%',
            once: true,
          },
          clearProps: 'transform,clipPath',
        },
      )

      if (!lightweightMotion) {
        gsap.fromTo(
          '.featured-work-video',
          { scale: 1.12, yPercent: -3 },
          {
            scale: 1.02,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.featured-work',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )

        gsap.utils.toArray('.key-frame-image img').forEach(image => {
          gsap.fromTo(
            image,
            { scale: 1.09, yPercent: -4 },
            {
              scale: 1.09,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: image.closest('.key-frame-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
              },
            },
          )
        })
      }

      gsap.fromTo(
        '.project-view-more',
        { autoAlpha: 0, y: 44, scaleX: 0.86 },
        {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.project-view-more',
            start: 'top 92%',
            once: true,
          },
          clearProps: 'transform,opacity,visibility',
        },
      )
    })

    return () => {
      context.revert()
      root.classList.remove('motion-ready')
    }
  }, [enabled])
}
