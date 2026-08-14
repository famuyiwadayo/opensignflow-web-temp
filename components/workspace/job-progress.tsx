import Link from 'next/link'
import {
  Check,
  Eye,
  Clock,
  Send,
  Bell,
  Download,
  MoreHorizontal,
  ArrowLeft,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Stage = 'signed' | 'viewed' | 'sent' | 'waiting'

const route: {
  order: number
  name: string
  email: string
  role: string
  stage: Stage
  at?: string
  color: string
}[] = [
  { order: 1, name: 'Ada Okafor', email: 'ada@acme.co', role: 'Provider', stage: 'signed', at: 'Aug 14 · 09:02', color: 'var(--cyan)' },
  { order: 2, name: 'Marcus Chen', email: 'm.chen@northwind.io', role: 'Client', stage: 'viewed', at: 'Aug 14 · 09:41', color: 'var(--violet)' },
  { order: 3, name: 'Legal Dept.', email: 'legal@northwind.io', role: 'Co-signer', stage: 'waiting', color: 'var(--warning)' },
]

const stageMeta: Record<Stage, { label: string; icon: typeof Check; tone: string }> = {
  signed: { label: 'Signed', icon: Check, tone: 'text-success bg-success/12' },
  viewed: { label: 'Viewing now', icon: Eye, tone: 'text-cyan bg-cyan/12' },
  sent: { label: 'Sent', icon: Send, tone: 'text-primary bg-primary/12' },
  waiting: { label: 'Waiting in queue', icon: Clock, tone: 'text-muted-foreground bg-muted' },
}

const events = [
  { label: 'Legal Dept. queued', detail: 'sequential order · position 3', time: 'pending', dot: 'bg-muted-foreground' },
  { label: 'Marcus Chen opened document', detail: '72.14.9.3 · Chrome / macOS', time: '09:41', dot: 'bg-cyan' },
  { label: 'Reminder scheduled', detail: 'auto follow-up in 24h', time: '09:05', dot: 'bg-accent' },
  { label: 'Ada Okafor signed', detail: 'hash 0x9f3a…c21 recorded', time: '09:02', dot: 'bg-success' },
  { label: 'Document sent', detail: '3 recipients · sequential', time: '08:58', dot: 'bg-primary' },
]

export function JobProgress() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-7">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to overview
      </Link>

      {/* Job header */}
      <div className="mt-4 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-3xl tracking-tight">Master Service Agreement</h1>
            <span className="rounded-sm bg-warning/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warning">
              In progress
            </span>
          </div>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
            MSA-2026-0417 · Northwind Robotics · $240,000
          </p>
        </div>
        <div className="flex gap-2">
          <button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-sm')}>
            <Bell className="h-3.5 w-3.5" />
            Remind
          </button>
          <button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-sm')}>
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button className={cn(buttonVariants({ variant: 'outline', size: 'icon-sm' }), 'rounded-sm')} aria-label="More">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Big progress */}
      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Completion
            </p>
            <p className="mt-1 font-serif text-4xl tracking-tight">
              33<span className="text-lg text-muted-foreground">%</span>
            </p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">1 of 3 signed · ETA today</p>
        </div>
        <div className="mt-4 flex h-2 gap-1">
          {route.map((r) => (
            <div
              key={r.order}
              className={cn(
                'h-full flex-1 rounded-full',
                r.stage === 'signed' ? 'bg-success' : r.stage === 'viewed' ? 'bg-cyan' : 'bg-muted',
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Routing order */}
        <section>
          <h2 className="mb-3 text-sm font-semibold tracking-tight">Signing order</h2>
          <ol className="space-y-2.5">
            {route.map((r) => {
              const meta = stageMeta[r.stage]
              return (
                <li
                  key={r.order}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border border-border bg-card p-3.5',
                    r.stage === 'viewed' && 'ring-1 ring-cyan/40',
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground">{String(r.order).padStart(2, '0')}</span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-semibold text-white"
                    style={{ background: r.color }}
                  >
                    {r.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">
                      {r.email} · {r.role}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className={cn('inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium', meta.tone)}>
                      <meta.icon className="h-3 w-3" />
                      {meta.label}
                    </span>
                    {r.at && <p className="mt-1 font-mono text-[10px] text-muted-foreground">{r.at}</p>}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Event log */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Event log</h2>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              live
            </span>
          </div>
          <div className="rounded-lg border border-border bg-card/40 p-4">
            <ol className="relative space-y-4 before:absolute before:left-[5px] before:top-1.5 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
              {events.map((e, i) => (
                <li key={i} className="relative flex gap-3 pl-5">
                  <span className={cn('absolute left-0 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-card', e.dot)} />
                  <div>
                    <p className="text-sm leading-snug text-foreground">{e.label}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                      {e.detail} · {e.time}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  )
}
