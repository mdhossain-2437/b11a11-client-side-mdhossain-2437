import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa'
import Magnetic from '../../../components/Magnetic/Magnetic'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email')
      return
    }
    setBusy(true)
    setTimeout(() => {
      toast.success("You're on the list — keep an eye on your inbox.")
      setEmail('')
      setBusy(false)
    }, 700)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="section">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-background p-8 md:p-14">
          <div
            aria-hidden
            className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-[120px] bg-primary/30"
          />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Stay in the loop</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight">
                Be first to know about new arrivals and exclusive deals
              </h3>
              <p className="text-secondary mt-3 max-w-md">
                One curated email a week. No spam, easy unsubscribe. We respect your inbox.
              </p>
            </div>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="input !py-3 sm:flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <Magnetic strength={0.18}>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary !py-3 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" aria-hidden />
                  <FaPaperPlane className={`relative transition-transform duration-300 ${busy ? 'translate-x-1 -translate-y-0.5' : 'group-hover:translate-x-1 group-hover:-translate-y-0.5'}`} />
                  <span className="relative">{busy ? 'Subscribing…' : 'Subscribe'}</span>
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
