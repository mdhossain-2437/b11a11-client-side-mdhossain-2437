import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCar, FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../../context/AuthProvider'

export default function Login() {
  const { login, googleLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [showPwd, setShowPwd] = useState(false)
  const [busy, setBusy] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async ({ email, password }) => {
    try {
      setBusy(true)
      await login(email, password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (e) {
      toast.error(prettyAuthError(e))
    } finally {
      setBusy(false)
    }
  }

  const onGoogle = async () => {
    try {
      setBusy(true)
      await googleLogin()
      toast.success('Signed in with Google')
      navigate(from, { replace: true })
    } catch (e) {
      toast.error(prettyAuthError(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1974&auto=format&fit=crop"
          alt="Sleek black car"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-sm">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Welcome back</p>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Pick up where you left off
          </h2>
          <p className="text-secondary mt-3">
            Sign in to manage your bookings, list new cars, and unlock member-only deals.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-yellow-700 text-black flex items-center justify-center">
              <FaCar />
            </span>
            <span className="font-display text-xl font-bold">VelocityDrive</span>
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-4xl">Log&#8209;in</h1>
          <p className="text-secondary mt-2">Don&apos;t have an account? <Link className="text-primary hover:underline" to="/register">Create one</Link>.</p>

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
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type="email"
                  className="input !pl-10"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                  })}
                />
              </div>
              {errors.email && <p className="text-accent text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="input !pl-10 !pr-10"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-accent text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full !py-3 disabled:opacity-50">
              {busy ? 'Signing in…' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function prettyAuthError(e) {
  const code = e?.code || ''
  if (code.includes('user-not-found')) return 'No account with that email'
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return 'Wrong email or password'
  if (code.includes('too-many-requests')) return 'Too many attempts. Try again later.'
  if (code.includes('popup-closed')) return 'Google sign-in cancelled'
  if (code.includes('network-request-failed')) return 'Network error. Check your connection.'
  return e?.message || 'Sign-in failed'
}
