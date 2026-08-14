import Link from 'next/link'
import {
  CheckCircle2,
  Download,
  Share2,
  ShieldCheck,
  FileCheck2,
  ArrowUpRight,
  Fingerprint,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const signers = [
  { name: 'Ada Okafor', role: 'Provider', at: 'Aug 14, 2026 · 09:02 UTC', hash: '0x9f3a…c21', color: 'var(--cyan)' },
  { name: 'Marcus Chen', role: 'Client', at: 'Aug 14, 2026 · 10:18 UTC', hash: '0x4be1…7d9', color: 'var(--violet)' },
  { name: 'Legal Dept.', role: 'Co-signer', at: 'Aug 14, 2026 · 11:47 UTC', hash: '0xa07c…f34', color: 'var(--warning)' },
]

export function Completed() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 items-center justify-between border-b border-border bg-card/60 px-5 backdrop-blur">
        <Link href="/" aria-label="OpenSignFlow home">
          <Logo />
        </Link>
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          Go to dashboard <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-5xl flex-1 gap-8 px-5 py-10 lg:grid-cols-[1fr_360px]">
        {/* Left: confirmation + document */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm border border-success/30 bg-success/10 px-3 py-1 font-mono text-xs text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed & sealed
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            The agreement is fully executed.
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground text-pretty">
            All 3 parties have signed <span className="text-foreground">Master Service Agreement</span>{' '}
            (MSA-2026-0417). A sealed PDF and certificate of completion have been distributed to every recipient.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-sm px-5')}>
              <Download className="h-4 w-4" />
              Download sealed PDF
            </button>
            <button className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-sm px-5')}>
              <FileCheck2 className="h-4 w-4" />
              Certificate
            </button>
            <button className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-11 rounded-sm px-3')} aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* sealed document preview */}
          <div className="dots-canvas mt-8 rounded-lg border border-border bg-[oklch(0.16_0.03_258)] p-6">
            <div className="relative mx-auto max-w-md rounded-sm bg-white px-10 py-11 shadow-2xl shadow-black/40">
              <span className="absolute right-5 top-5 grid h-12 w-12 rotate-6 place-items-center rounded-full border-2 border-success/50 text-success">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-foreground/40">
                Contract № MSA-2026-0417
              </p>
              <h2 className="mt-3 font-serif text-xl tracking-tight text-canvas-foreground">
                Master Service Agreement
              </h2>
              <div className="mt-5 space-y-2">
                {[95, 88, 92].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-canvas-foreground/12" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-5">
                <div>
                  <p className="border-b border-canvas-foreground/25 pb-1 font-serif text-base italic text-canvas-foreground">
                    A. Okafor
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
                    Provider · signed
                  </p>
                </div>
                <div>
                  <p className="border-b border-canvas-foreground/25 pb-1 font-serif text-base italic text-canvas-foreground">
                    M. Chen
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
                    Client · signed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: certificate of completion */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border bg-elevated/60 px-4 py-3">
              <Fingerprint className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Certificate of completion</span>
            </div>
            <div className="p-4">
              <dl className="space-y-2.5 text-sm">
                <Row label="Envelope ID" value="MSA-2026-0417" mono />
                <Row label="Status" value="Completed" />
                <Row label="Pages" value="8" mono />
                <Row label="Signers" value="3 of 3" mono />
                <Row label="Sealed at" value="Aug 14 · 11:47 UTC" mono />
              </dl>

              <div className="my-4 h-px bg-border" />

              <p className="pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                Signature ledger
              </p>
              <ul className="space-y-3">
                {signers.map((s) => (
                  <li key={s.name} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white"
                      style={{ background: s.color }}
                    >
                      {s.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight">{s.name}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{s.at}</p>
                      <p className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                        {s.hash}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 border-t border-border bg-elevated/40 px-4 py-3">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                Tamper-evident hash chain verified · eIDAS qualified
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn('text-foreground', mono && 'font-mono text-xs')}>{value}</dd>
    </div>
  )
}
