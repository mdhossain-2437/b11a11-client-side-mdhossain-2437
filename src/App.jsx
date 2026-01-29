import { ReactLenis } from '@studio-freight/react-lenis'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ReactLenis root>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-background text-white font-body">
         <h1 className="text-4xl text-primary font-display text-center pt-20">Car Rental System Initialized 🚀</h1>
         <p className="text-center text-secondary mt-4">Ready for Awwwards-level development.</p>
      </div>
    </ReactLenis>
  )
}

export default App
