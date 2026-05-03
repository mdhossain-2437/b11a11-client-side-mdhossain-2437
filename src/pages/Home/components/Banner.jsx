import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import Magnetic from '../../../components/Magnetic/Magnetic'

export default function Banner() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.bn-line', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 })
        .fromTo('.bn-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.bn-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3')
        .fromTo('.bn-stat', { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative min-h-[92vh] w-full overflow-hidden flex items-center"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          alt="Premium luxury sports car at golden hour"
          className="absolute inset-0 h-full w-full object-cover scale-105"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative section py-24 md:py-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-secondary mb-6 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseGlow" />
            New · Curated luxury fleet
          </div>
          <h1 className="font-display font-bold leading-[0.95] text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight">
            <span className="block overflow-hidden"><span className="bn-line block">Drive Your</span></span>
            <span className="block overflow-hidden"><span className="bn-line block text-gradient">Dreams Today</span></span>
            <span className="block overflow-hidden"><span className="bn-line block text-secondary text-2xl md:text-3xl lg:text-4xl font-medium mt-3">Premium cars · Instant booking · Zero hassle</span></span>
          </h1>

          <p className="bn-sub text-secondary text-base md:text-lg max-w-2xl mt-7">
            Choose from sports coupes, family SUVs and executive sedans — book in 30 seconds, drive in style.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.25}>
              <Link to="/available-cars" className="bn-cta btn-primary !px-7 !py-3.5 text-base">
                View Available Cars <FaArrowRight />
              </Link>
            </Magnetic>
            <a
              href="#why-us"
              className="bn-cta inline-flex items-center gap-3 text-secondary hover:text-white transition-colors group"
            >
              <span className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <FaPlay className="text-xs" />
              </span>
              How it works
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-3 max-w-xl">
            {[
              { k: '500+', v: 'Premium cars' },
              { k: '4.9★', v: 'Avg. rating' },
              { k: '24/7', v: 'Support' },
            ].map((s) => (
              <div key={s.v} className="bn-stat glass rounded-xl px-4 py-3">
                <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                <dd className="text-xs text-secondary tracking-wide">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Floating rating card on the right */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="relative ml-auto max-w-md">
            <div className="absolute inset-0 -translate-x-6 translate-y-6 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative glass rounded-3xl p-6 animate-floatY">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <FaStar className="text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary">Most loved</p>
                  <p className="font-display font-bold text-lg">Aston Martin DB12</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['$240/d', '0–60: 3.5s', '671 hp'].map((t) => (
                  <span key={t} className="text-center text-xs px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-secondary text-sm">
                “Booked in under a minute — drove to the coast the same evening.”
                <span className="block text-xs text-primary mt-2">— Maria K., verified renter</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
