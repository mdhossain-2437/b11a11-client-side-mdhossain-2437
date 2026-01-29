import { ReactLenis } from '@studio-freight/react-lenis'
import { Toaster } from 'react-hot-toast'
import { Link, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <ReactLenis root>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-background text-white font-body">
        <nav className="flex items-center justify-between px-6 py-4 backdrop-blur bg-surface/60">
          <Link to="/" className="text-primary font-display text-2xl">CarRent</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/login" className="hover:text-primary">Login</Link>
            <Link to="/dashboard" className="hover:text-primary">My Cars</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="text-center pt-20">
              <h1 className="text-4xl text-primary font-display">Car Rental System Initialized 🚀</h1>
              <p className="text-secondary mt-4">Ready for Awwwards-level development.</p>
            </div>
          } />
          <Route path="/login" element={<div className="p-8 text-center">Login page placeholder</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="p-8 text-center">Protected Dashboard</div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </ReactLenis>
  )
}

export default App
