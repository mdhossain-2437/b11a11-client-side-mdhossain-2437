import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FaCarSide, FaEdit, FaPlus, FaTrash, FaTimes } from 'react-icons/fa'
import axiosSecure from '../../services/axios'
import Loader from '../../components/Loader/Loader'
import { formatDate } from '../../utils/date'

export default function MyCars() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['my-cars'],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-cars')
      return res.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/cars/${id}`)
    },
    onSuccess: () => {
      toast.success('Car removed')
      queryClient.invalidateQueries({ queryKey: ['my-cars'] })
      setDeleting(null)
    },
    onError: () => toast.error('Failed to delete'),
  })

  return (
    <section className="py-14 md:py-20">
      <div className="section">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Your garage</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl">My Cars</h1>
            <p className="text-secondary mt-2">Manage everything you have listed for rent in one place.</p>
          </div>
          <Link to="/add-car" className="btn-primary self-start">
            <FaPlus /> Add a new car
          </Link>
        </header>

        {isLoading ? (
          <Loader label="Loading your cars" />
        ) : cars.length === 0 ? (
          <div className="glass rounded-3xl py-20 text-center">
            <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 border border-primary/30 items-center justify-center mx-auto mb-4">
              <FaCarSide className="text-primary text-2xl" />
            </div>
            <p className="font-display text-2xl font-bold">No cars yet</p>
            <p className="text-secondary mt-2 mb-5">List your first car and start earning today.</p>
            <Link to="/add-car" className="btn-primary"><FaPlus /> Add Car</Link>
          </div>
        ) : (
          <div className="overflow-x-auto glass rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-secondary uppercase tracking-wider text-xs">
                <tr>
                  <Th>Image</Th>
                  <Th>Model</Th>
                  <Th>Daily price</Th>
                  <Th>Bookings</Th>
                  <Th>Status</Th>
                  <Th>Date added</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c, idx) => (
                  <tr
                    key={c._id}
                    className={`border-t border-white/5 transition-colors hover:bg-primary/5 ${
                      idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                    }`}
                  >
                    <Td>
                      <img src={c.image} alt={c.model} className="h-12 w-20 object-cover rounded-md" />
                    </Td>
                    <Td>
                      <div className="font-semibold">{c.model}</div>
                      <div className="text-secondary text-xs">{c.brand}</div>
                    </Td>
                    <Td className="text-primary font-semibold">${c.dailyPrice}</Td>
                    <Td>{c.bookingCount ?? 0}</Td>
                    <Td>
                      <span
                        className={`badge ${
                          c.available
                            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                            : 'bg-red-500/20 border-red-400/40 text-red-300'
                        }`}
                      >
                        {c.available ? 'Available' : 'Booked'}
                      </span>
                    </Td>
                    <Td className="text-secondary">{formatDate(c.postedDate)}</Td>
                    <Td className="text-right whitespace-nowrap">
                      <button onClick={() => setEditing(c)} className="btn-info mr-2"><FaEdit /> Update</button>
                      <button onClick={() => setDeleting(c)} className="btn-danger"><FaTrash /> Delete</button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <UpdateCarModal
          car={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            queryClient.invalidateQueries({ queryKey: ['my-cars'] })
            setEditing(null)
          }}
        />
      )}

      {deleting && (
        <ConfirmModal
          title="Delete this car?"
          desc={`"${deleting.model}" will be permanently removed from your listings.`}
          confirmText="Delete"
          danger
          busy={deleteMutation.isPending}
          onClose={() => setDeleting(null)}
          onConfirm={() => deleteMutation.mutate(deleting._id)}
        />
      )}
    </section>
  )
}

function Th({ children, className = '' }) {
  return <th className={`text-left px-5 py-4 ${className}`}>{children}</th>
}
function Td({ children, className = '' }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>
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

function UpdateCarModal({ car, onClose, onSaved }) {
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      model: car.model,
      brand: car.brand,
      dailyPrice: car.dailyPrice,
      available: car.available ? 'true' : 'false',
      regNumber: car.regNumber,
      image: car.image,
      location: car.location,
      description: car.description,
      features: Array.isArray(car.features) ? car.features.join(', ') : (car.features || ''),
      fuelType: car.fuelType || 'Petrol',
      transmission: car.transmission || 'Auto',
    },
  })

  const onSubmit = async (data) => {
    try {
      const payload = {
        model: data.model,
        brand: data.brand,
        dailyPrice: Number(data.dailyPrice),
        available: data.available === 'true',
        regNumber: data.regNumber,
        image: data.image,
        location: data.location,
        description: data.description,
        features: data.features.split(',').map((f) => f.trim()).filter(Boolean),
        fuelType: data.fuelType,
        transmission: data.transmission,
      }
      await axiosSecure.patch(`/cars/${car._id}`, payload)
      toast.success('Car updated')
      onSaved()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-3xl glass rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl my-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-2xl font-bold">Update car</h3>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            ['model', 'Model'],
            ['brand', 'Brand'],
            ['dailyPrice', 'Daily Price ($)', 'number'],
            ['regNumber', 'Registration Number'],
            ['image', 'Image URL'],
            ['location', 'Location'],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">{label}</label>
              <input
                type={type || 'text'}
                className="input"
                {...register(name, { required: `${label} is required` })}
              />
              {errors[name] && <p className="text-accent text-xs mt-1">{errors[name].message}</p>}
            </div>
          ))}
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Availability</label>
            <select className="input cursor-pointer" {...register('available')}>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Fuel</label>
            <select className="input cursor-pointer" {...register('fuelType')}>
              {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Transmission</label>
            <select className="input cursor-pointer" {...register('transmission')}>
              {['Auto', 'Manual', 'DCT', 'PDK', 'CVT'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Features (comma-separated)</label>
            <input className="input" {...register('features')} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Description</label>
            <textarea className="input min-h-[110px]" rows={4} {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-accent text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
