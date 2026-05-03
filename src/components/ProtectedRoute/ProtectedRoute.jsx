import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../../context/AuthProvider'
import PageSpinner from '../Loader/PageSpinner'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <PageSpinner />
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}
