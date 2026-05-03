import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import axiosSecure from '../../../services/axios'
import CarCard from '../../../components/CarCard/CarCard'
import { FaArrowRight } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const fallback = [
  {
    _id: 'demo-1',
    model: 'Tesla Model S Plaid',
    brand: 'Tesla',
    dailyPrice: 220,
    available: true,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    location: 'Dhaka',
    fuelType: 'Electric',
    transmission: 'Auto',
    bookingCount: 12,
    postedDate: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    features: ['Autopilot', 'Premium audio', 'Glass roof'],
  },
  {
    _id: 'demo-2',
    model: 'Porsche 911 GT3',
    brand: 'Porsche',
    dailyPrice: 380,
    available: true,
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop',
    location: 'Gulshan',
    fuelType: 'Petrol',
    transmission: 'PDK',
    bookingCount: 7,
    postedDate: new Date(Date.now() - 24 * 3600 * 1000),
    features: ['Sport+', 'Carbon brakes', 'Bucket seats'],
  },
  {
    _id: 'demo-3',
    model: 'Range Rover Sport',
    brand: 'Land Rover',
    dailyPrice: 200,
    available: false,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2069&auto=format&fit=crop',
    location: 'Banani',
    fuelType: 'Diesel',
    transmission: 'Auto',
    bookingCount: 18,
    postedDate: new Date(Date.now() - 3 * 24 * 3600 * 1000),
    features: ['4x4', 'Heated seats', 'Pano roof'],
  },
  {
    _id: 'demo-4',
    model: 'Audi RS e-tron GT',
    brand: 'Audi',
    dailyPrice: 290,
    available: true,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
    location: 'Uttara',
    fuelType: 'Electric',
    transmission: 'Auto',
    bookingCount: 9,
    postedDate: new Date(Date.now() - 5 * 3600 * 1000),
    features: ['Quattro', 'Matrix LED', 'B&O sound'],
  },
  {
    _id: 'demo-5',
    model: 'BMW M4 Competition',
    brand: 'BMW',
    dailyPrice: 260,
    available: true,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
    location: 'Mirpur',
    fuelType: 'Petrol',
    transmission: 'DCT',
    bookingCount: 11,
    postedDate: new Date(Date.now() - 7 * 24 * 3600 * 1000),
    features: ['M Drive', 'CFRP roof', 'Sport diff'],
  },
  {
    _id: 'demo-6',
    model: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    dailyPrice: 540,
    available: true,
    image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=2000&auto=format&fit=crop',
    location: 'Bashundhara',
    fuelType: 'Petrol',
    transmission: 'Auto',
    bookingCount: 5,
    postedDate: new Date(),
    features: ['V10', 'Launch ctrl', 'AWD'],
  },
]

export default function RecentListings() {
  const rootRef = useRef(null)

  const { data: cars = [], isError, isLoading } = useQuery({
    queryKey: ['cars-recent'],
    queryFn: async () => {
      const res = await axiosSecure.get('/cars', { params: { sort: 'date_desc', limit: 8 } })
      return res.data
    },
  })

  const list = (!isLoading && !isError && cars && cars.length > 0) ? cars.slice(0, 8) : fallback

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rl-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [list.length])

  return (
    <section ref={rootRef} className="py-20 md:py-28">
      <div className="section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Latest Drops</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Recent Listings</h2>
            <p className="text-secondary mt-2 max-w-xl">
              Freshly added to our garage. Hand-picked, inspected and ready to roll.
            </p>
          </div>
          <Link
            to="/available-cars"
            className="self-start md:self-auto inline-flex items-center gap-2 text-primary hover:text-white transition-colors group"
          >
            View all cars
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((car) => (
            <div className="rl-card" key={car._id || car.id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
