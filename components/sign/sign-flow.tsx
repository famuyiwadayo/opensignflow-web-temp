'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PenLine, Check, ShieldCheck, ChevronRight, Clock } from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const fields = [
  { id: 'name', label: 'Full legal name', type: 'text' as const },
  { id: 'sig', label: 'Signature', type: 'signature' as const },
  { id: 'date', label: 'Date', type: 'date' as const },
]

export function SignFlow() {
  const [signed, setSigned] = useState<Record<string, boolean>>({})
  const [name, setName] = useState('')
  const doneCount = Object.values(signed).filter(Boolean).length + (name ? 1 : 0)
  const total = fields.length
  const allDone = doneCount >= total

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Signer header */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-card/60 px-5 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Secure signing session
          </span>
          <span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">
            Expires in 6d
          </span>
        </div>
      </header>

      {/* Action banner */}
      <div className="border-b border-border bg-accent/10 px-5 py-2.5">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
            MC
          </span>
          <p className="text-sm text-foreground">
            <span className="font-medium">Ada Okafor</span> requested your signature on{' '}
            <span className="font-medium">Master Service Agreement</span>.
          </p>
          <span className="ml-auto hidden font-mono text-xs text-muted-foreground sm:block">
            {doneCount}/{total} fields
          </span>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-6 px-5 py-6 lg:grid-cols-[1fr_320px]">
        {/* Document */}
        <div className="dots-canvas rounded-lg border border-border bg-[oklch(0.16_0.03_258)] p-6">
          <div className="mx-auto max-w-lg rounded-sm bg-white px-10 py-12 shadow-2xl shadow-black/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-foreground/40">
              Contract № MSA-2026-0417
            </p>
            <h1 className="mt-3 font-serif text-2xl tracking-tight text-canvas-foreground">
              Master Service Agreement
            </h1>
            <div className="mt-6 space-y-2">
              {[96, 90, 84, 92, 70].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-canvas-foreground/12" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-8 space-y-2">
              {[88, 94, 76].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-canvas-foreground/12" style={{ width: `${w}%` }} />
              ))}
            </div>

            {/* signature field inline */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div>
                <div
                  className={cn(
                    'flex h-14 items-end border-b-2 pb-1',
                    signed.sig ? 'border-success' : 'border-accent',
                  )}
                >
                  {signed.sig && (
                    <span className="font-serif text-xl italic text-canvas-foreground">{name || 'M. Chen'}</span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
                  Client signature
                </p>
              </div>
              <div>
                <div className="flex h-14 items-end border-b-2 border-canvas-foreground/25 pb-1">
                  <span className="font-serif text-xl italic text-canvas-foreground/80">A. Okafor</span>
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
                  Provider signature
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Signing panel */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Your action items
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Full legal name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type your name"
                  className="h-9 w-full rounded-sm border border-border bg-background px-2.5 text-sm outline-none focus:border-primary/60"
                />
              </div>

              <button
                onClick={() => setSigned((s) => ({ ...s, sig: true }))}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-sm border-2 border-dashed px-3 py-3 text-left transition-colors',
                  signed.sig
                    ? 'border-success/60 bg-success/5'
                    : 'border-accent/50 bg-accent/5 hover:bg-accent/10',
                )}
              >
                <span
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-sm',
                    signed.sig ? 'bg-success/15 text-success' : 'bg-accent/15 text-accent',
                  )}
                >
                  {signed.sig ? <Check className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
                </span>
                <div>
                  <p className="text-sm font-medium">{signed.sig ? 'Signature adopted' : 'Adopt signature'}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {signed.sig ? name || 'M. Chen' : 'Draw or type to sign'}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSigned((s) => ({ ...s, date: true }))}
                className={cn(
                  'flex w-full items-center justify-between rounded-sm border border-border px-3 py-2.5 text-left transition-colors hover:bg-muted',
                )}
              >
                <span className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Date signed
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {signed.date ? 'Aug 14, 2026' : 'Auto'}
                </span>
              </button>
            </div>

            <Link
              href={allDone ? '/completed' : '#'}
              aria-disabled={!allDone}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-5 h-11 w-full rounded-sm',
                !allDone && 'pointer-events-none opacity-40',
              )}
            >
              Finish & submit
              <ChevronRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
              By signing you agree this electronic signature is legally binding under ESIGN & eIDAS.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-2.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <p className="font-mono text-[10px] text-muted-foreground">
              256-bit encrypted · IP & timestamp recorded
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
