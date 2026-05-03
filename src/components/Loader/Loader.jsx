export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full border-2 border-white/10" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        <span className="absolute inset-2 rounded-full bg-primary/10 blur-md" />
      </div>
      <p className="text-secondary text-sm tracking-wide uppercase">{label}…</p>
    </div>
  )
}
