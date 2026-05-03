import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AddCar from './pages/AddCar/AddCar'
import AvailableCars from './pages/AvailableCars/AvailableCars'
import CarDetails from './pages/CarDetails/CarDetails'
import Error404 from './pages/Error404/Error404'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import MyBookings from './pages/MyBookings/MyBookings'
import MyCars from './pages/MyCars/MyCars'
import Register from './pages/Register/Register'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#121212',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
          },
          success: { iconTheme: { primary: '#D4AF37', secondary: '#0a0a0a' } },
          error: { iconTheme: { primary: '#FF4D4D', secondary: '#0a0a0a' } },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/available-cars" element={<AvailableCars />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-car"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cars"
            element={
              <ProtectedRoute>
                <MyCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  )
}
