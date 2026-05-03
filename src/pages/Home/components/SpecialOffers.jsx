import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../../../components/SectionHeading/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const offers = [
  {
    title: 'Weekend Getaway',
    discount: '15% OFF',
    desc: 'Book any luxury car for the weekend and unlock an instant 15% discount on the total fare.',
    cta: 'Book Now',
    color: 'from-amber-500/20 to-orange-700/10',
    side: 'left',
  },
  {
    title: 'Holiday Special',
    discount: '$99/Day',
    desc: 'Drive premium SUVs at an unbeatable flat $99/day rate this holiday season — limited slots.',
    cta: 'Learn More',
    color: 'from-blue-700/30 to-purple-900/20',
    side: 'right',
  },
]

export default function SpecialOffers() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.so-card').forEach((card, idx) => {
        gsap.from(card, {
          x: idx % 2 === 0 ? -120 : 120,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      })

      const marquee = rootRef.current.querySelector('.so-marquee')
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, duration: 24, ease: 'none', repeat: -1 })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="offers" ref={rootRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 border-y border-primary/20 bg-primary/[0.04] py-3">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <div className="so-marquee whitespace-nowrap flex gap-12 text-primary/80 font-display font-bold uppercase tracking-[0.3em] text-sm w-max will-change-transform">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                ⚡ Limited time · 20% off your first ride · Weekend rentals · Free upgrades · Premium fleet ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section pt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Special Offers</p>
          <SectionHeading className="font-display font-bold text-4xl md:text-5xl overflow-hidden">Deals worth turning your engine on</SectionHeading>
          <p className="text-secondary mt-3">Exclusive promotions, curated weekly. Snap them before they&apos;re gone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((o) => (
            <article
              key={o.title}
              className={`so-card relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10 bg-gradient-to-br ${o.color} hover:border-primary/40 hover:-translate-y-1 transition-all duration-500`}
            >
              <span className="absolute -top-12 -right-6 font-display font-extrabold text-white/5 text-[12rem] leading-none select-none">
                %
              </span>
              <span className="badge bg-accent/15 border-accent/40 text-red-300 mb-3 inline-block">Limited Time</span>
              <h3 className="font-display font-bold text-4xl md:text-5xl text-primary">{o.discount}</h3>
              <h4 className="font-display font-bold text-xl md:text-2xl mt-1">{o.title}</h4>
              <p className="text-secondary mt-3 max-w-md">{o.desc}</p>
              <Link to="/available-cars" className="mt-6 inline-flex items-center gap-2 btn-ghost">
                {o.cta} <FaArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
