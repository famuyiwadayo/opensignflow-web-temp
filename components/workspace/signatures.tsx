import Link from 'next/link'
import { FileText, Filter, LayoutGrid, List, ArrowUpRight } from 'lucide-react'
import { signatureDocs, statusMeta } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const summary = [
  { label: 'Total documents', value: '184' },
  { label: 'In progress', value: '31' },
  { label: 'Completed', value: '142' },
  { label: 'Completion rate', value: '94%' },
]

const filters = ['All', 'Draft', 'Out for signature', 'Viewed', 'Completed', 'Declined']

export function SignaturesOverview() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-7">
      {/* Summary strip */}
      <section className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-card p-5">
            <p className="font-serif text-3xl tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Toolbar */}
      <section className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f, i) => (
            <button
              key={f}
              className={cn(
                'rounded-sm px-2.5 py-1 text-xs font-medium transition-colors',
                i === 0
                  ? 'bg-primary/12 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
          <div className="flex items-center rounded-sm border border-border">
            <button className="grid h-8 w-8 place-items-center rounded-l-sm bg-muted text-foreground" aria-label="Grid view">
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button className="grid h-8 w-8 place-items-center text-muted-foreground transition-colors hover:text-foreground" aria-label="List view">
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Document grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {signatureDocs.map((doc) => {
          const meta = statusMeta[doc.status]
          const pct = doc.recipients ? Math.round((doc.signed / doc.recipients) * 100) : 0
          return (
            <Link
              key={doc.id}
              href="/jobs"
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40"
            >
              {/* Document thumbnail */}
              <div className="relative flex h-36 items-center justify-center border-b border-border bg-[oklch(0.96_0.005_260)]">
                <div className="flex h-24 w-[70px] flex-col gap-1 rounded-sm bg-white p-2 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
                  <div className="h-1 w-3/4 rounded-full bg-foreground/15" />
                  <div className="h-1 w-full rounded-full bg-foreground/10" />
                  <div className="h-1 w-full rounded-full bg-foreground/10" />
                  <div className="h-1 w-2/3 rounded-full bg-foreground/10" />
                  <div className="mt-auto h-4 w-10 rounded-sm bg-primary/25" />
                </div>
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
                  <FileText className="h-3 w-3" /> {doc.format} · {doc.pages}p
                </span>
                <span
                  className={cn(
                    'absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium',
                    meta.tone,
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
                  {meta.label}
                </span>
              </div>
              {/* Meta */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground group-hover:text-primary">{doc.title}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{doc.id}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {doc.signed}/{doc.recipients}
                  </span>
                </div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">Updated {doc.updated}</p>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
