import { ReactLenis } from '@studio-freight/react-lenis'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { AuthContext } from './context/AuthProvider'
import Home from './pages/Home/Home'
import AvailableCars from './pages/AvailableCars/AvailableCars'
import AddCar from './pages/AddCar/AddCar'
import MyCars from './pages/MyCars/MyCars'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/', { replace: true })
    } catch {}
  }
  return (
    <ReactLenis root>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-background text-white font-body">
        <nav className="flex items-center justify-between px-6 py-4 backdrop-blur bg-surface/60">
          <Link to="/" className="text-primary font-display text-2xl">CarRent</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/available-cars" className="hover:text-primary">Available Cars</Link>
            {user && <Link to="/add-car" className="hover:text-primary">Add Car</Link>}
            {!user && <Link to="/login" className="hover:text-primary">Login</Link>}
            {!user && <Link to="/register" className="hover:text-primary">Register</Link>}
            {user && <Link to="/my-cars" className="hover:text-primary">My Cars</Link>}
            {user && <button onClick={handleLogout} className="hover:text-primary">Logout</button>}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/available-cars" element={<AvailableCars />} />
          <Route path="/add-car" element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-cars" element={
            <ProtectedRoute>
              <MyCars />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </ReactLenis>
  )
}

export default App
