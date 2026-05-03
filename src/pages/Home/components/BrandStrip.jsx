const brands = [
  'BMW', 'Mercedes', 'Audi', 'Porsche', 'Tesla', 'Ferrari',
  'Lamborghini', 'Aston Martin', 'Range Rover', 'Lexus', 'Cadillac',
]

export default function BrandStrip() {
  const list = [...brands, ...brands]
  return (
    <section className="relative py-8 border-y border-white/5 bg-surface/40 overflow-hidden">
      <div className="section flex items-center gap-6 overflow-hidden">
        <p className="hidden md:block text-xs uppercase tracking-[0.3em] text-secondary whitespace-nowrap">
          Trusted brands
        </p>
        <div className="flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <ul className="flex w-max gap-12 animate-marquee will-change-transform">
            {list.map((b, i) => (
              <li
                key={`${b}-${i}`}
                className="font-display text-2xl md:text-3xl font-bold tracking-tight text-secondary/70 hover:text-primary transition-colors"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
