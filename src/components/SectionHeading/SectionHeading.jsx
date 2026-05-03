import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../../utils/splitText'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section heading with a per-character scroll-triggered reveal.
 * Drop-in replacement for an `<h2>`. Splits the text into chars on first
 * mount and animates them rising from below as the heading enters view.
 *
 *   <SectionHeading className="text-4xl md:text-6xl">Recent Listings</SectionHeading>
 */
export default function SectionHeading({ as: Tag = 'h2', children, className = '', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

    const chars = splitChars(node)
    if (chars.length === 0) return

    const anim = gsap.from(chars, {
      yPercent: 110,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.025,
      scrollTrigger: {
        trigger: node,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [children])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
