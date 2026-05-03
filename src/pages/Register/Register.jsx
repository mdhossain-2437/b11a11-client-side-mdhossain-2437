import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCar, FaEnvelope, FaEye, FaEyeSlash, FaImage, FaLock, FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../context/AuthProvider'

const passwordRule = {
  required: 'Password is required',
  validate: (value) => {
    if (value.length < 6) return 'Min 6 characters'
    if (!/[A-Z]/.test(value)) return 'At least one uppercase letter'
    if (!/[a-z]/.test(value)) return 'At least one lowercase letter'
    return true
  },
}

export default function Register() {
  const { register: registerUser, googleLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState(false)
  const [busy, setBusy] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async ({ name, email, password, photoURL }) => {
    try {
      setBusy(true)
      await registerUser(name, email, password, photoURL)
      toast.success('Account created — welcome aboard!')
      navigate('/', { replace: true })
    } catch (e) {
      toast.error(e?.message || 'Could not create account')
    } finally {
      setBusy(false)
    }
  }

  const onGoogle = async () => {
    try {
      setBusy(true)
      await googleLogin()
      toast.success('Signed up with Google')
      navigate('/', { replace: true })
    } catch (e) {
      toast.error(e?.message || 'Google sign-up failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-yellow-700 text-black flex items-center justify-center">
              <FaCar />
            </span>
            <span className="font-display text-xl font-bold">VelocityDrive</span>
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-4xl">Create account</h1>
          <p className="text-secondary mt-2">Already with us? <Link className="text-primary hover:underline" to="/login">Log&#8209;in</Link>.</p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="mt-7 w-full inline-flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-full py-2.5 hover:bg-secondary transition-colors disabled:opacity-50"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-secondary">
            <span className="flex-1 h-px bg-white/10" /> or <span className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field label="Name" Icon={FaUser} error={errors.name}>
              <input
                className="input !pl-10"
                placeholder="Your name"
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
              />
            </Field>
            <Field label="Email" Icon={FaEnvelope} error={errors.email}>
              <input
                type="email"
                className="input !pl-10"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
              />
            </Field>
            <Field label="Photo URL (optional)" Icon={FaImage} error={errors.photoURL}>
              <input
                className="input !pl-10"
                placeholder="https://…"
                {...register('photoURL', { pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL' } })}
              />
            </Field>
            <Field label="Password" Icon={FaLock} error={errors.password}>
              <input
                type={showPwd ? 'text' : 'password'}
                className="input !pl-10 !pr-10"
                placeholder="••••••••"
                {...register('password', passwordRule)}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </Field>

            <button type="submit" disabled={busy} className="btn-primary w-full !py-3 disabled:opacity-50">
              {busy ? 'Creating account…' : 'Create account'}
            </button>
            <p className="text-[11px] text-secondary text-center">
              By signing up you agree to our terms & privacy policy.
            </p>
          </form>
        </div>
      </div>

      <div className="relative hidden lg:block order-1 lg:order-2">
        <img
          src="https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=2070&auto=format&fit=crop"
          alt="Premium car interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent" />
        <div className="absolute bottom-12 right-12 max-w-sm text-right">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Hello, driver</p>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Join the most loved car-rental community
          </h2>
          <p className="text-secondary mt-3">
            Save your favorite cars, track bookings, and become a host of your own fleet.
          </p>
        </div>
      </div>
    </section>
  )
}

function Field({ label, Icon, children, error }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        {children}
      </div>
      {error && <p className="text-accent text-xs mt-1">{error.message}</p>}
    </div>
  )
}
