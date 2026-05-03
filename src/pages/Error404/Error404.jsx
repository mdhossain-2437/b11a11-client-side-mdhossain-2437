import { Link } from 'react-router-dom'
import { FaArrowLeft, FaCar } from 'react-icons/fa'

export default function Error404() {
  return (
    <section className="min-h-[78vh] flex items-center">
      <div className="section grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Lost on the road</p>
          <h1 className="font-display font-extrabold leading-none text-8xl md:text-[10rem] text-gradient">
            404
          </h1>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            This page took a wrong turn
          </h2>
          <p className="text-secondary mt-3 max-w-md">
            The page you&apos;re looking for has either driven off-route or never existed. Let&apos;s get you back on track.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary"><FaArrowLeft /> Back to Home</Link>
            <Link to="/available-cars" className="btn-ghost"><FaCar /> Browse Cars</Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
            alt="Car driving on an empty highway"
            className="rounded-3xl border border-white/10 shadow-2xl"
          />
          <div className="absolute -inset-1 -z-10 bg-primary/20 blur-3xl rounded-3xl" />
        </div>
      </div>
    </section>
  )
}
