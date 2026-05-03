import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaCarSide,
  FaTimes,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import axiosSecure from '../../services/axios'
import Loader from '../../components/Loader/Loader'
import { daysBetween, formatDate, formatDateTime } from '../../utils/date'

export default function MyBookings() {
  const queryClient = useQueryClient()
  const [modify, setModify] = useState(null)
  const [cancel, setCancel] = useState(null)

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-bookings')
      return res.data
    },
  })

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/bookings/${id}`, { status: 'cancelled' })
    },
    onSuccess: () => {
      toast.success('Booking cancelled')
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
      setCancel(null)
    },
    onError: () => toast.error('Could not cancel'),
  })

  const chartData = useMemo(() => {
    return bookings.map((b) => ({
      name: b.car?.model?.split(' ').slice(0, 2).join(' ') || 'Car',
      price: Number(b.totalPrice || (b.car?.dailyPrice ?? 0) * daysBetween(b.startDate, b.endDate)),
    }))
  }, [bookings])

  return (
    <section className="py-14 md:py-20">
      <div className="section">
        <header className="mb-8">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Your trips</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl">My Bookings</h1>
          <p className="text-secondary mt-2">View, modify or cancel your reservations at any time.</p>
        </header>

        {isLoading ? (
          <Loader label="Loading bookings" />
        ) : bookings.length === 0 ? (
          <div className="glass rounded-3xl py-20 text-center">
            <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 border border-primary/30 items-center justify-center mx-auto mb-4">
              <FaCarSide className="text-primary text-2xl" />
            </div>
            <p className="font-display text-2xl font-bold">No bookings yet</p>
            <p className="text-secondary mt-2 mb-5">Start exploring and book your first ride.</p>
            <Link to="/available-cars" className="btn-primary">Browse Cars</Link>
          </div>
        ) : (
          <>
            <div className="glass rounded-2xl p-4 md:p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg">Spend by booking</h3>
                <span className="text-secondary text-sm">{bookings.length} booking{bookings.length === 1 ? '' : 's'}</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ left: -10 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" stroke="#C0C0C0" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#C0C0C0" tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(212,175,55,0.08)' }}
                    contentStyle={{
                      background: '#121212', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, color: 'white',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="price" name="Total ($)" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto glass rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-secondary uppercase tracking-wider text-xs">
                  <tr>
                    <Th>Car</Th>
                    <Th>Booking date</Th>
                    <Th>Period</Th>
                    <Th>Total</Th>
                    <Th>Status</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, idx) => {
                    const days = daysBetween(b.startDate, b.endDate)
                    const total = Number(b.totalPrice || (b.car?.dailyPrice ?? 0) * days)
                    const status = (b.status || 'confirmed').toLowerCase()
                    return (
                      <tr
                        key={b._id}
                        className={`border-t border-white/5 transition-colors hover:bg-primary/5 ${
                          idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                        }`}
                      >
                        <Td>
                          <div className="flex items-center gap-3">
                            <img src={b.car?.image} alt={b.car?.model} className="h-12 w-20 object-cover rounded-md" />
                            <div>
                              <div className="font-semibold">{b.car?.model || '—'}</div>
                              <div className="text-secondary text-xs">{b.car?.brand}</div>
                            </div>
                          </div>
                        </Td>
                        <Td className="text-secondary whitespace-nowrap">{formatDateTime(b.bookingDate || b.createdAt)}</Td>
                        <Td className="whitespace-nowrap">
                          {formatDate(b.startDate)} → {formatDate(b.endDate)}
                          <span className="block text-secondary text-xs">{days} day{days === 1 ? '' : 's'}</span>
                        </Td>
                        <Td className="text-primary font-semibold">${total}</Td>
                        <Td>
                          <StatusBadge status={status} />
                        </Td>
                        <Td className="text-right whitespace-nowrap">
                          <button
                            onClick={() => setModify(b)}
                            disabled={status === 'cancelled'}
                            className="btn-info mr-2 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FaCalendarAlt /> Modify Date
                          </button>
                          <button
                            onClick={() => setCancel(b)}
                            disabled={status === 'cancelled'}
                            className="btn-danger disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FaTrash /> Cancel
                          </button>
                        </Td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {modify && (
        <ModifyDateModal
          booking={modify}
          onClose={() => setModify(null)}
          onSaved={() => {
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] })
            setModify(null)
          }}
        />
      )}

      {cancel && (
        <ConfirmModal
          title="Cancel this booking?"
          desc={`Are you sure you want to cancel your booking of "${cancel.car?.model || 'this car'}"?`}
          confirmText="Yes, cancel"
          danger
          busy={cancelMutation.isPending}
          onClose={() => setCancel(null)}
          onConfirm={() => cancelMutation.mutate(cancel._id)}
        />
      )}
    </section>
  )
}

function Th({ children, className = '' }) { return <th className={`text-left px-5 py-4 ${className}`}>{children}</th> }
function Td({ children, className = '' }) { return <td className={`px-5 py-4 ${className}`}>{children}</td> }

function StatusBadge({ status }) {
  if (status === 'cancelled') {
    return <span className="badge bg-red-500/20 border-red-400/40 text-red-300"><FaTimesCircle /> Cancelled</span>
  }
  if (status === 'pending') {
    return <span className="badge bg-amber-500/20 border-amber-400/40 text-amber-300">Pending</span>
  }
  return <span className="badge bg-emerald-500/20 border-emerald-400/40 text-emerald-300"><FaCheckCircle /> Confirmed</span>
}

function ConfirmModal({ title, desc, onClose, onConfirm, busy, danger, confirmText = 'Confirm' }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-2xl p-6 border border-white/10 shadow-2xl">
        <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
        <p className="text-secondary text-sm mb-5">{desc}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-ghost !py-2 !px-4 text-sm">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className={`btn-primary !py-2 !px-4 text-sm disabled:opacity-50 ${danger ? '!bg-accent !text-white hover:!bg-red-500' : ''}`}
          >
            {busy ? 'Working…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

function ModifyDateModal({ booking, onClose, onSaved }) {
  const [start, setStart] = useState(booking.startDate?.slice(0, 10) || '')
  const [end, setEnd] = useState(booking.endDate?.slice(0, 10) || '')
  const [busy, setBusy] = useState(false)
  const today = new Date().toISOString().slice(0, 10)
  const days = daysBetween(start, end)

  const submit = async () => {
    if (!start || !end || days <= 0) {
      toast.error('Please pick valid dates')
      return
    }
    try {
      setBusy(true)
      await axiosSecure.patch(`/bookings/${booking._id}`, { startDate: start, endDate: end })
      toast.success('Booking updated')
      onSaved()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Could not update')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold">Modify booking date</h3>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white">
            <FaTimes />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Start</label>
            <input type="date" min={today} className="input" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">End</label>
            <input type="date" min={start || today} className="input" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        <p className="text-secondary text-xs mt-3">{days} day{days === 1 ? '' : 's'} selected</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost !py-2 !px-4 text-sm">Cancel</button>
          <button onClick={submit} disabled={busy} className="btn-primary !py-2 !px-4 text-sm disabled:opacity-50">
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
