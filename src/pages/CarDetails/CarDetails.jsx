import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaArrowLeft, FaCalendarCheck, FaCogs, FaGasPump, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'
import axiosSecure from '../../services/axios'
import Loader from '../../components/Loader/Loader'
import { daysBetween, formatDate } from '../../utils/date'

function ConfirmModal({ open, onClose, onConfirm, summary, busy }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-10 w-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
            <FaCalendarCheck />
          </span>
          <h3 className="font-display text-xl font-bold">Confirm your booking</h3>
        </div>
        <p className="text-secondary text-sm mb-5">{summary}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-ghost !py-2 !px-4 text-sm">Cancel</button>
          <button onClick={onConfirm} disabled={busy} className="btn-primary !py-2 !px-4 text-sm disabled:opacity-50">
            {busy ? 'Booking…' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cars/${id}`)
      return res.data
    },
    enabled: Boolean(id),
  })

  const days = daysBetween(startDate, endDate)
  const total = car ? days * Number(car.dailyPrice || 0) : 0
  const today = new Date().toISOString().slice(0, 10)

  const bookingMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/bookings', {
        carId: id,
        startDate,
        endDate,
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Booking confirmed — see you on the road!')
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
      navigate('/my-bookings')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'Booking failed')
    },
  })

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader /></div>
  if (isError || !car) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-secondary">We couldn&apos;t find this car.</p>
        <Link to="/available-cars" className="btn-primary">
          <FaArrowLeft /> Back to Available Cars
        </Link>
      </div>
    )
  }

  return (
    <section className="py-14 md:py-20">
      <div className="section">
        <Link to="/available-cars" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-6">
          <FaArrowLeft /> Back to Available Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                className={`absolute top-4 left-4 badge ${
                  car.available
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : 'bg-red-500/20 border-red-400/40 text-red-300'
                }`}
              >
                {car.available ? 'Available' : 'Booked'}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { l: 'Brand', v: car.brand },
                { l: 'Fuel', v: car.fuelType, Icon: FaGasPump },
                { l: 'Transmission', v: car.transmission, Icon: FaCogs },
                { l: 'Location', v: car.location, Icon: FaMapMarkerAlt },
              ].map(({ l, v, Icon }) => (
                <div key={l} className="glass rounded-xl px-4 py-3">
                  <p className="text-[11px] uppercase tracking-widest text-secondary">{l}</p>
                  <p className="mt-1 inline-flex items-center gap-2 font-semibold">
                    {Icon && <Icon className="text-primary" />}
                    {v || '—'}
                  </p>
                </div>
              ))}
            </div>

            {Array.isArray(car.features) && car.features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-display font-bold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <span key={f} className="badge bg-white/5 border-white/10 text-secondary">
                      <FaCheckCircle className="text-primary" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-display font-bold mb-3">About this car</h3>
              <p className="text-secondary leading-relaxed">{car.description || 'No description provided.'}</p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="glass rounded-3xl p-6 sticky top-24">
              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{car.model}</h1>
              <p className="text-secondary mt-1">{car.brand}{car.location ? ` · ${car.location}` : ''}</p>
              <p className="mt-4 text-primary text-3xl font-display font-bold">
                ${car.dailyPrice}
                <span className="text-secondary text-sm font-normal">/day</span>
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-secondary mb-1">Start date</label>
                  <input type="date" min={today} className="input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-secondary mb-1">End date</label>
                  <input type="date" min={startDate || today} className="input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-background/60 p-4">
                <div className="flex items-center justify-between text-secondary text-sm">
                  <span>Days</span>
                  <span className="text-white font-semibold">{days}</span>
                </div>
                <div className="flex items-center justify-between text-secondary text-sm mt-1">
                  <span>Daily rate</span>
                  <span className="text-white font-semibold">${car.dailyPrice}</span>
                </div>
                <div className="h-px bg-white/10 my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">${total}</span>
                </div>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                disabled={!car.available || days <= 0}
                className="btn-primary w-full mt-5 !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!car.available ? 'Currently booked' : 'Book Now'}
              </button>
              <p className="text-[11px] text-secondary mt-3 text-center">
                You won&apos;t be charged until you confirm in the next step.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        busy={bookingMutation.isPending}
        summary={`Confirm booking of "${car.model}" from ${formatDate(startDate)} to ${formatDate(endDate)} (${days} day${days === 1 ? '' : 's'}). Total: $${total}.`}
        onConfirm={() => bookingMutation.mutate()}
      />
    </section>
  )
}
