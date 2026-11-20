import type { ReactNode } from 'react'
import { SceneBackdrop, type SceneId } from './SceneBackdrop'

/** Form / content card floating over a Cologne market scene. */
export function MarketFrame({
  scene,
  children,
  objectPosition = 'center',
}: {
  scene: SceneId
  children: ReactNode
  objectPosition?: string
}) {
  return (
    <section className="relative mx-auto min-h-[70vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/25">
      <SceneBackdrop scene={scene} dim="heavy" objectPosition={objectPosition} />
      <div className="relative z-10 flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        {children}
      </div>
    </section>
  )
}
