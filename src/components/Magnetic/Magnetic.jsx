import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Wraps a single child element and makes it lightly track the cursor
 * — a polished micro-interaction common to luxury brand sites.
 *
 *   <Magnetic strength={0.4}><button className="btn-primary">Book</button></Magnetic>
 *
 * The wrapper is `inline-block`, so it doesn't disturb layout.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const target = el.firstElementChild
    if (!target) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    const enter = () => gsap.to(target, { scale: 1.05, duration: 0.4, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const relX = e.clientX - (r.left + r.width / 2)
      const relY = e.clientY - (r.top + r.height / 2)
      gsap.to(target, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
    const leave = () => {
      gsap.to(target, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return (
    <span ref={wrapRef} className={`inline-block ${className}`}>
      {children}
    </span>
  )
}
