import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaList, FaSearch, FaTh } from 'react-icons/fa'
import axiosSecure from '../../services/axios'
import CarCard from '../../components/CarCard/CarCard'
import Loader from '../../components/Loader/Loader'

const sortOptions = [
  { v: '', t: 'Default' },
  { v: 'date_desc', t: 'Newest first' },
  { v: 'date_asc', t: 'Oldest first' },
  { v: 'price_asc', t: 'Price: low → high' },
  { v: 'price_desc', t: 'Price: high → low' },
]

export default function AvailableCars() {
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [sort, setSort] = useState('')
  const controlsRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 400)
    return () => clearTimeout(t)
  }, [search])

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ['cars', debounced, sort],
    queryFn: async () => {
      const params = {}
      if (debounced) params.search = debounced
      if (sort) params.sort = sort
      const res = await axiosSecure.get('/cars', { params })
      return res.data
    },
  })

  return (
    <section className="py-14 md:py-20">
      <div className="section">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Browse</p>
          <h1 className="font-display font-bold text-4xl md:text-6xl">Available Cars</h1>
          <p className="text-secondary mt-3">
            Search by model, brand or location. Sort by price or date. Switch between grid and list views.
          </p>
        </header>

        <div
          ref={controlsRef}
          className="glass rounded-2xl p-4 md:p-5 mb-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
        >
          <label className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search by model, brand, or location…"
              className="input !pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search cars"
            />
          </label>

          <div className="flex items-center gap-3">
            <select
              className="input cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort by"
            >
              {sortOptions.map((o) => (
                <option key={o.v} value={o.v}>Sort: {o.t}</option>
              ))}
            </select>

            <div className="inline-flex bg-background rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-primary text-black shadow' : 'text-secondary hover:text-white'}`}
                aria-label="Grid view"
                title="Grid view"
              >
                <FaTh />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-primary text-black shadow' : 'text-secondary hover:text-white'}`}
                aria-label="List view"
                title="List view"
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader label="Loading cars" />
        ) : isError ? (
          <div className="text-center py-20 text-secondary">
            Could not load cars. Please try again later.
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex h-20 w-20 rounded-full bg-surface border border-white/10 items-center justify-center mx-auto mb-4">
              <FaSearch className="text-2xl text-secondary" />
            </div>
            <p className="font-display text-2xl font-bold">No cars match your search</p>
            <p className="text-secondary mt-2">Try a different keyword or clear filters.</p>
          </div>
        ) : (
          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-5'
            }
          >
            {cars.map((car) => (
              <CarCard key={car._id || car.id} car={car} view={view} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
