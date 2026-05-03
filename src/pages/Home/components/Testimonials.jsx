import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    name: 'Sadia Ahmed',
    role: 'Travel blogger',
    avatar: 'https://i.pravatar.cc/100?img=47',
    text: 'Booking a Mercedes for our wedding shoot took two minutes. Pickup was spotless, return was painless.',
    stars: 5,
  },
  {
    name: 'Rafiq Hossain',
    role: 'Software engineer',
    avatar: 'https://i.pravatar.cc/100?img=58',
    text: 'Used VelocityDrive for a 9-day trip. The Range Rover Sport was immaculate and customer support truly is 24/7.',
    stars: 5,
  },
  {
    name: 'Maria Khan',
    role: 'Product designer',
    avatar: 'https://i.pravatar.cc/100?img=32',
    text: 'The booking flow is the best I\u2019ve seen. Clean, fast and trustworthy. I\u2019ll definitely come back.',
    stars: 5,
  },
]

export default function Testimonials() {
  const rootRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tm-card', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="py-20 md:py-28 bg-surface/40">
      <div className="section">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Loved by drivers</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">Stories from the road</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="tm-card relative rounded-2xl bg-background border border-white/5 p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <FaQuoteLeft className="text-primary/40 text-3xl mb-4" />
              <p className="text-white/90 leading-relaxed text-sm md:text-base">{r.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="h-11 w-11 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-semibold leading-none">{r.name}</p>
                  <p className="text-secondary text-xs mt-1">{r.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-primary text-sm">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
