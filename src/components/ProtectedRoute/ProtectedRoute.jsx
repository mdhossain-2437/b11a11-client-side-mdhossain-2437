import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
 
export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()
 
  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
 
