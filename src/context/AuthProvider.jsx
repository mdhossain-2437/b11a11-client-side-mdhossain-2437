import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { auth, googleProvider } from '../services/firebase'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import axiosSecure from '../services/axios'
 
export const AuthContext = createContext(null)
 
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setLoading(false)
      if (currentUser?.email) {
        try {
          const { data } = await axiosSecure.post('/jwt', { email: currentUser.email })
          // token is set in http-only cookie
        } catch (e) {
          // ignore
        }
      } else {
        try {
          await axiosSecure.post('/logout')
        } catch (e) {
          // ignore
        }
      }
    })
    return () => unsubscribe()
  }, [])
 
  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
 
  const register = async (name, email, password, photoURL) => {
    setLoading(true)
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(res.user, { displayName: name, photoURL })
    return res
  }
 
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
 
  const logout = () => {
    setLoading(true)
    return signOut(auth)
  }
 
  const value = { user, loading, googleLogin, register, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
 
AuthProvider.propTypes = {
  children: PropTypes.node,
}
 
