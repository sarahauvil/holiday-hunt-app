/** Soft painterly backdrop: blurred fill + sharp cover + canvas grain. */

/** Prefix public asset paths with Vite `base` so GitHub Pages (`/holiday-hunt-app/`) works. */
export function publicAsset(path: string): string {
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}

export function PaintedScene({
  src,
  objectPosition = 'center',
  className = '',
}: {
  src: string
  objectPosition?: string
  className?: string
}) {
  const href = publicAsset(src)

  return (
    <div className={`painted-scene pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Soft fill — avoids hard stretch edges */}
      <img
        src={href}
        alt=""
        className="painted-scene__blur absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      {/* Main painting */}
      <img
        src={href}
        alt=""
        className="painted-scene__art absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      {/* Canvas varnish / grain */}
      <div className="painted-scene__grain absolute inset-0" />
      <div className="painted-scene__vignette absolute inset-0" />
    </div>
  )
}
