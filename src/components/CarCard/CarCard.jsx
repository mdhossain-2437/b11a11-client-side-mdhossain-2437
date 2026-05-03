import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaGasPump, FaCogs, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa'
import { formatDistanceToNowShort } from '../../utils/date'

export default function CarCard({ car, view = 'grid' }) {
  const isList = view === 'list'
  return (
    <article
      className={`car-card group relative overflow-hidden rounded-2xl border border-white/5 bg-surface hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.25)] ${
        isList ? 'flex flex-col md:flex-row' : 'flex flex-col'
      }`}
    >
      <div className={`relative overflow-hidden ${isList ? 'md:w-72 md:flex-shrink-0 h-56 md:h-auto' : 'h-56'}`}>
        <img
          src={car.image}
          alt={car.model}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
            car.available
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
              : 'bg-red-500/20 text-red-300 border border-red-400/40'
          }`}
        >
          {car.available ? 'Available' : 'Booked'}
        </span>
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full border border-white/10">
          {formatDistanceToNowShort(car.postedDate)}
        </span>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-display font-bold leading-tight">
              {car.model}
            </h3>
            <p className="text-secondary text-sm">
              {car.brand}
              {car.location ? ` · ${car.location}` : ''}
            </p>
          </div>
          <p className="text-right">
            <span className="text-primary text-2xl font-display font-bold">${car.dailyPrice}</span>
            <span className="block text-secondary text-xs">/day</span>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-secondary text-xs">
          <div className="flex items-center gap-1.5"><FaGasPump className="text-primary" /> {car.fuelType || '—'}</div>
          <div className="flex items-center gap-1.5"><FaCogs className="text-primary" /> {car.transmission || '—'}</div>
          <div className="flex items-center gap-1.5"><FaUsers className="text-primary" /> {car.bookingCount ?? 0} bookings</div>
        </div>

        {car.location && (
          <p className="text-secondary text-xs mt-2 inline-flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-primary" /> {car.location}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <Link
            to={`/car/${car._id || car.id}`}
            className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors"
          >
            Book Now <FaArrowRight />
          </Link>
          {Array.isArray(car.features) && car.features.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-1.5 max-w-[55%] justify-end">
              {car.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-secondary"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

CarCard.propTypes = {
  car: PropTypes.object.isRequired,
  view: PropTypes.oneOf(['grid', 'list']),
}
