import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

const faqs = [
  {
    q: 'Do I need a credit card to rent a car?',
    a: 'A valid debit or credit card is required at pickup for the security deposit, which is fully refunded after a successful return.',
  },
  {
    q: 'What documents are required?',
    a: 'A national ID or passport, plus a valid driving license. International renters need a valid IDP (International Driving Permit).',
  },
  {
    q: 'Can I modify or cancel my booking?',
    a: 'Yes — you can modify dates or cancel from your “My Bookings” page. Free cancellation up to 24 hours before pickup.',
  },
  {
    q: 'Is fuel included in the price?',
    a: 'Cars are delivered with a full tank. Return them with a full tank, or we will charge market rate plus a small refueling fee.',
  },
  {
    q: 'How do I list my own car?',
    a: 'Sign up for free, click “Add Car”, fill in the details and your car is live within minutes after a quick verification.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="section grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">FAQ</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">Everything you wanted to know</h2>
          <p className="text-secondary mt-3">Can&apos;t find an answer? Our support team is just one chat away, 24 hours a day.</p>
        </div>
        <ul className="lg:col-span-8 divide-y divide-white/10 rounded-2xl bg-surface/60 border border-white/10 overflow-hidden">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base md:text-lg">{f.q}</span>
                  <span className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-secondary text-sm md:text-base">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
