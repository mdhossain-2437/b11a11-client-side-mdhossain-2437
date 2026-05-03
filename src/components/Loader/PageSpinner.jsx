export default function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative h-20 w-20">
        <span className="absolute inset-0 rounded-full border-2 border-white/10" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        <span className="absolute inset-3 rounded-full bg-primary/20 blur-lg" />
      </div>
    </div>
  )
}
