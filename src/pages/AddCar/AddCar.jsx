import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaCarSide, FaPlus } from 'react-icons/fa'
import axiosSecure from '../../services/axios'

export default function AddCar() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      available: 'true',
      fuelType: 'Petrol',
      transmission: 'Auto',
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
        features: data.features ? data.features.split(',').map((f) => f.trim()).filter(Boolean) : [],
        description: data.description,
        image: data.image,
        location: data.location,
        fuelType: data.fuelType,
        transmission: data.transmission,
      }
      const res = await axiosSecure.post('/cars', payload)
      if (res?.data?.insertedId) {
        toast.success('Car listed successfully')
        reset()
        navigate('/my-cars')
      } else {
        toast.error('Could not list the car')
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to add car')
    }
  }

  return (
    <section className="py-14 md:py-20">
      <div className="section max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">List your car</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl flex items-center justify-center gap-3">
            <FaCarSide className="text-primary" /> Add a Car
          </h1>
          <p className="text-secondary mt-3">Fill out the details below — your car will be live in seconds.</p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          noValidate
        >
          <Field label="Model" error={errors.model}>
            <input className="input" {...register('model', { required: 'Model is required' })} placeholder="Toyota Camry 2023" />
          </Field>
          <Field label="Brand" error={errors.brand}>
            <input className="input" {...register('brand', { required: 'Brand is required' })} placeholder="Toyota" />
          </Field>
          <Field label="Daily Rental Price ($)" error={errors.dailyPrice}>
            <input
              type="number"
              className="input"
              min="1"
              step="1"
              {...register('dailyPrice', { required: 'Price is required', min: { value: 1, message: 'Must be at least 1' } })}
              placeholder="45"
            />
          </Field>
          <Field label="Availability">
            <select className="input cursor-pointer" {...register('available')}>
              <option value="true">Available</option>
              <option value="false">Booked</option>
            </select>
          </Field>
          <Field label="Registration Number" error={errors.regNumber}>
            <input className="input" {...register('regNumber', { required: 'Registration is required' })} placeholder="DHA-123-456" />
          </Field>
          <Field label="Image URL" error={errors.image}>
            <input
              className="input"
              {...register('image', {
                required: 'Image URL is required',
                pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL' },
              })}
              placeholder="https://…"
            />
          </Field>
          <Field label="Location" error={errors.location}>
            <input className="input" {...register('location', { required: 'Location is required' })} placeholder="Dhaka" />
          </Field>
          <Field label="Fuel Type">
            <select className="input cursor-pointer" {...register('fuelType')}>
              {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Transmission">
            <select className="input cursor-pointer" {...register('transmission')}>
              {['Auto', 'Manual', 'DCT', 'PDK', 'CVT'].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Features (comma-separated)">
            <input className="input" {...register('features')} placeholder="GPS, AC, Bluetooth" />
          </Field>

          <Field label="Description" error={errors.description} className="md:col-span-2">
            <textarea
              className="input min-h-[120px]"
              rows={4}
              {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Min 10 chars' } })}
              placeholder="Tell renters what makes this car special…"
            />
          </Field>

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <button type="button" onClick={() => reset()} className="btn-ghost">
              Reset
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
              <FaPlus /> {isSubmitting ? 'Saving…' : 'Save Car'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, children, error, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">{label}</label>
      {children}
      {error?.message && <p className="text-accent text-xs mt-1">{error.message}</p>}
    </div>
  )
}
