import { useEffect, useRef } from 'react'
import Banner from './components/Banner'
import WhyChooseUs from './components/WhyChooseUs'
import RecentListings from './components/RecentListings'
import SpecialOffers from './components/SpecialOffers'
import BrandStrip from './components/BrandStrip'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import HowItWorks from './components/HowItWorks'
import Faq from './components/Faq'
import Newsletter from './components/Newsletter'

export default function Home() {
  const rootRef = useRef(null)
  useEffect(() => {
    if (rootRef.current) rootRef.current.scrollIntoView({ block: 'start', behavior: 'auto' })
  }, [])
  return (
    <div ref={rootRef} className="overflow-hidden">
      <Banner />
      <BrandStrip />
      <WhyChooseUs />
      <HowItWorks />
      <RecentListings />
      <Stats />
      <SpecialOffers />
      <Testimonials />
      <Faq />
      <Newsletter />
    </div>
  )
}
