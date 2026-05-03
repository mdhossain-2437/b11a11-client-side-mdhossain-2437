import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const axiosSecure = axios.create({
  baseURL,
  withCredentials: true,
})

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default axiosSecure
