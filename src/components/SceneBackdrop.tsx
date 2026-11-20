import { PaintedScene } from './PaintedScene'

const scenes = {
  rhine: '/images/market-rhine.jpg',
  dom: '/images/market-dom.jpg',
  square: '/images/market-square.jpg',
  tree: '/images/hub-tree.jpg',
  santa: '/images/hero-santa.jpg',
} as const

export type SceneId = keyof typeof scenes

/** Vintage Cologne Weihnachtsmarkt scene with readable overlays. */
export function SceneBackdrop({
  scene,
  className = '',
  objectPosition = 'center',
  dim = 'medium',
}: {
  scene: SceneId
  className?: string
  objectPosition?: string
  dim?: 'light' | 'medium' | 'heavy'
}) {
  const dimClass =
    dim === 'light'
      ? 'from-[#0a1f16]/55 via-[#0a1f16]/25 to-[#0a1f16]/40'
      : dim === 'heavy'
        ? 'from-[#0a1f16]/92 via-[#0a1f16]/75 to-[#0a1f16]/85'
        : 'from-[#0a1f16]/80 via-[#0a1f16]/45 to-[#0a1f16]/70'

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-[#14281f]" />
      <PaintedScene src={scenes[scene]} objectPosition={objectPosition} />
      <div className={`absolute inset-0 bg-gradient-to-br ${dimClass}`} />
    </div>
  )
}
