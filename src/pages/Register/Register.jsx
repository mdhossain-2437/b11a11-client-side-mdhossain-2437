import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
 
export default function Register() {
  const { register: signup } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
 
  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password, data.photoURL)
      toast.success('Account created')
      navigate('/', { replace: true })
    } catch (e) {
      toast.error('Registration failed')
    }
  }
 
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md bg-surface/60 backdrop-blur rounded-xl p-8">
        <h2 className="text-2xl font-display text-primary mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Name" type="text" {...register('name', { required: true })} />
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Photo URL" type="url" {...register('photoURL')} />
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Email" type="email" {...register('email', { required: true })} />
          <input className="w-full px-4 py-2 rounded bg-surface text-white" placeholder="Password" type="password" {...register('password', { required: true })} />
          <button className="w-full bg-primary text-black py-2 rounded">Create Account</button>
        </form>
        <p className="text-center text-secondary mt-4">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  )
}
 
