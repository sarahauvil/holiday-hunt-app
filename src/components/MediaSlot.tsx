import { useEffect, useState } from 'react'

async function assetExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-snow/25 bg-navy/30 px-4 py-6 text-center">
      <p className="text-lg text-gold">{label}</p>
      <p className="text-sm text-snow/60">Asset coming soon — drop a file in later.</p>
    </div>
  )
}

export function MediaSlot({
  video,
  pdf,
  docx,
  pptx,
}: {
  video?: string
  pdf?: string
  docx?: string
  pptx?: string
}) {
  const [availability, setAvailability] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const urls = [video, pdf, docx, pptx].filter(Boolean) as string[]
    let cancelled = false
    ;(async () => {
      const entries = await Promise.all(
        urls.map(async (url) => [url, await assetExists(url)] as const),
      )
      if (!cancelled) {
        setAvailability(Object.fromEntries(entries))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [video, pdf, docx, pptx])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-snow/70">Video</h3>
        {video && availability[video] ? (
          <video controls className="w-full rounded-xl border border-snow/15 bg-black/40">
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <ComingSoon label="Short video clip" />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-snow/70">Slides (PDF)</h3>
        {pdf && availability[pdf] ? (
          <iframe
            title="Station slides"
            src={pdf}
            className="h-64 w-full rounded-xl border border-snow/15 bg-snow"
          />
        ) : (
          <ComingSoon label="PDF slides" />
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-snow/70">
          Downloads
        </h3>
        <div className="flex flex-wrap gap-3">
          {docx && availability[docx] ? (
            <a
              href={docx}
              download
              className="rounded-lg border border-gold/40 bg-evergreen/50 px-4 py-2 text-sm font-semibold text-gold hover:bg-evergreen"
            >
              Download Word notes
            </a>
          ) : (
            <span className="rounded-lg border border-dashed border-snow/20 px-4 py-2 text-sm text-snow/45">
              Word notes soon
            </span>
          )}
          {pptx && availability[pptx] ? (
            <a
              href={pptx}
              download
              className="rounded-lg border border-gold/40 bg-evergreen/50 px-4 py-2 text-sm font-semibold text-gold hover:bg-evergreen"
            >
              Download PowerPoint
            </a>
          ) : (
            <span className="rounded-lg border border-dashed border-snow/20 px-4 py-2 text-sm text-snow/45">
              PowerPoint soon
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
