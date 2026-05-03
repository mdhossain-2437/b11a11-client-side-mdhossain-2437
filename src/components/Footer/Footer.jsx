import { Link } from 'react-router-dom'
import {
  FaCar,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const socials = [
  { Icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: FaGithub, href: 'https://github.com/mdhossain-2437', label: 'GitHub' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-surface/60 backdrop-blur-xl">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-yellow-700 text-black shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
              <FaCar />
            </span>
            <span className="font-display text-2xl font-bold">
              Velocity<span className="text-primary">Drive</span>
            </span>
          </Link>
          <p className="text-secondary mt-4 leading-relaxed text-sm">
            Premium cars, transparent prices, instant bookings. Drive the
            extraordinary, every day, with VelocityDrive.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-black text-white border border-white/10 transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link className="hover:text-primary" to="/">Home</Link></li>
            <li><Link className="hover:text-primary" to="/available-cars">Available Cars</Link></li>
            <li><Link className="hover:text-primary" to="/login">Log&#8209;in</Link></li>
            <li><Link className="hover:text-primary" to="/register">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-secondary">
            <li><a className="hover:text-primary" href="#why-us">Why Choose Us</a></li>
            <li><a className="hover:text-primary" href="#offers">Special Offers</a></li>
            <li><a className="hover:text-primary" href="#faq">FAQs</a></li>
            <li><a className="hover:text-primary" href="#stats">Our Numbers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-secondary">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-primary" />
              <span>221B Drive Avenue, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary" />
              <a href="tel:+8801700000000" className="hover:text-primary">+880 1700-000000</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <a href="mailto:hello@velocitydrive.app" className="hover:text-primary">
                hello@velocitydrive.app
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary/80">
          <p>© {year} VelocityDrive. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with <span className="text-primary">♥</span> by{' '}
            <a
              href="https://github.com/mdhossain-2437"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              @mdhossain-2437
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
