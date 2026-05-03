import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa'

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
              <button type="submit" disabled={busy} className="btn-primary !py-3">
                <FaPaperPlane /> {busy ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
