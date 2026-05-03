import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCarSide, FaDollarSign, FaMousePointer, FaHeadset, FaShieldAlt, FaBolt } from 'react-icons/fa'
import SectionHeading from '../../../components/SectionHeading/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { Icon: FaCarSide, title: 'Wide Variety of Cars', desc: 'From budget-friendly hatchbacks to luxury sports cars and family SUVs — there is something for every journey.' },
  { Icon: FaDollarSign, title: 'Affordable Prices', desc: 'Competitive daily rates with full transparency. No hidden fees, no last-minute surprises.' },
  { Icon: FaMousePointer, title: 'Easy Booking Process', desc: 'Reserve your car in under a minute with a frictionless flow optimized for desktop and mobile.' },
  { Icon: FaHeadset, title: '24/7 Customer Support', desc: 'A dedicated team is always one click away to assist with bookings, swaps and roadside help.' },
  { Icon: FaShieldAlt, title: 'Verified & Insured', desc: 'Every car is inspected before each ride, and bookings come with a baseline insurance plan.' },
  { Icon: FaBolt, title: 'Instant Confirmation', desc: 'Get a confirmed booking the moment you click — no waiting for owner approval.' },
]

export default function WhyChooseUs() {
  const rootRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wcu-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why-us" ref={rootRef} className="py-20 md:py-28 bg-surface/40">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Why Choose Us</p>
          <SectionHeading className="font-display font-bold text-4xl md:text-5xl overflow-hidden">A premium experience, end-to-end</SectionHeading>
          <p className="text-secondary mt-3">
            We obsess over the details so you can focus on the road. Here&apos;s what makes VelocityDrive different.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc }) => (
            <article
              key={title}
              className="wcu-card group relative rounded-2xl bg-background border border-white/5 hover:border-primary/40 p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center mb-5">
                <Icon className="text-primary text-xl" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{desc}</p>
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    'radial-gradient(280px 80px at 20% 0%, rgba(212,175,55,0.10), transparent 60%)',
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
