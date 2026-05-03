import { createContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'
import axiosSecure from '../services/axios'

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser?.email) {
        try {
          await axiosSecure.post('/jwt', { email: currentUser.email })
        } catch {
          /* ignore */
        }
      } else {
        try {
          await axiosSecure.post('/logout')
        } catch {
          /* ignore */
        }
      }
      setLoading(false)
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
    await updateProfile(res.user, { displayName: name, photoURL: photoURL || null })
    setUser({ ...res.user, displayName: name, photoURL: photoURL || null })
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

  const value = useMemo(
    () => ({ user, loading, googleLogin, register, login, logout }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

// Re-export GoogleAuthProvider so callers needing extra scopes can extend
export { GoogleAuthProvider }
