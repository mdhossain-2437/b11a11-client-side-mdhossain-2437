import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaSearchLocation, FaCalendarCheck, FaCarAlt, FaSmile } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { Icon: FaSearchLocation, title: 'Find your car', desc: 'Browse the curated fleet, filter by price, brand or location.' },
  { Icon: FaCalendarCheck, title: 'Pick your dates', desc: 'Choose start & end dates — total cost is calculated instantly.' },
  { Icon: FaCarAlt, title: 'Drive away', desc: 'Confirm in one click. Receive a confirmation and pickup details.' },
  { Icon: FaSmile, title: 'Enjoy the ride', desc: 'Hit the road with 24/7 support behind you the whole way.' },
]

export default function HowItWorks() {
  const rootRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-step', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={rootRef} className="py-20 md:py-28">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">How it works</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">From browsing to driving in 4 steps</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ Icon, title, desc }, i) => (
            <li
              key={title}
              className="hiw-step relative glass rounded-2xl p-6 group overflow-hidden"
            >
              <span className="absolute -top-6 -right-2 font-display text-7xl font-extrabold text-white/5 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                <Icon className="text-primary text-xl" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
