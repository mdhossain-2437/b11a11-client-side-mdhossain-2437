import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthProvider'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
 
export default function Login() {
  const { login, googleLogin } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
 
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      toast.success('Logged in')
      navigate(from, { replace: true })
    } catch (e) {
      toast.error('Login failed')
    }
  }
 
  const handleGoogle = async () => {
    try {
      await googleLogin()
      toast.success('Logged in with Google')
      navigate(from, { replace: true })
    } catch (e) {
      toast.error('Google login failed')
    }
  }
 
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md bg-surface/60 backdrop-blur rounded-xl p-8">
        <h2 className="text-2xl font-display text-primary mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Email" type="email" {...register('email', { required: true })} />
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Password" type="password" {...register('password', { required: true })} />
          <button className="w-full bg-primary text-black py-2 rounded">Login</button>
        </form>
        <button onClick={handleGoogle} className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-black py-2 rounded">
          <FcGoogle /> Continue with Google
        </button>
        <p className="text-center text-secondary mt-4">
          New here? <Link to="/register" className="text-primary">Register</Link>
        </p>
      </div>
    </div>
  )
}
 
