import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaCar, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthProvider'

const navLinkClass = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
    isActive ? 'text-primary' : 'text-secondary hover:text-white'
  } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform ${
    isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'
  }`

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out')
      navigate('/', { replace: true })
    } catch {
      toast.error('Logout failed')
    }
  }

  const guestLinks = (
    <>
      <NavLink to="/" end className={navLinkClass}>Home</NavLink>
      <NavLink to="/available-cars" className={navLinkClass}>Available Cars</NavLink>
      <NavLink to="/login" className={navLinkClass}>Log&#8209;in</NavLink>
    </>
  )

  const userLinks = (
    <>
      <NavLink to="/" end className={navLinkClass}>Home</NavLink>
      <NavLink to="/available-cars" className={navLinkClass}>Available Cars</NavLink>
      <NavLink to="/add-car" className={navLinkClass}>Add Car</NavLink>
      <NavLink to="/my-cars" className={navLinkClass}>My Cars</NavLink>
      <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
    </>
  )

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-yellow-700 text-black shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-transform group-hover:rotate-[-6deg]">
            <FaCar className="text-lg" />
          </span>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
            Velocity<span className="text-primary">Drive</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {user ? userLinks : guestLinks}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/10" title={user.displayName || user.email}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="me" className="h-7 w-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <FaUserCircle className="text-xl text-secondary" />
                )}
                <span className="text-xs text-secondary max-w-[140px] truncate">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary hover:text-black text-primary border border-primary/40 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-surface border border-white/10 text-white"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-[80vh] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'
        } bg-background/95 backdrop-blur-xl`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {user ? userLinks : guestLinks}
          <div className="h-px bg-white/10 my-2" />
          {user ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 bg-primary text-black px-4 py-2.5 rounded-full text-sm font-semibold"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary text-black px-4 py-2.5 rounded-full text-sm font-semibold"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
