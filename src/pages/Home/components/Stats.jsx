import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 12500, suffix: '+', label: 'Happy renters' },
  { num: 540, suffix: '+', label: 'Cars in fleet' },
  { num: 32, suffix: '', label: 'Cities covered' },
  { num: 99, suffix: '%', label: 'On-time pickups' },
]

export default function Stats() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = rootRef.current.querySelectorAll('[data-counter]')
      counters.forEach((el) => {
        const target = Number(el.dataset.counter)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString()
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="stats" ref={rootRef} className="py-20 bg-surface/40 border-y border-white/5">
      <div className="section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-bold text-4xl md:text-6xl text-primary">
                <span data-counter={s.num}>0</span>
                <span>{s.suffix}</span>
              </p>
              <p className="text-secondary text-sm md:text-base mt-2 uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
