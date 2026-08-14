import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'
import { jobs, statusMeta, activity, type JobStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const metrics = [
  { label: 'Out for signature', value: '18', delta: '+3', icon: Clock, tone: 'text-warning' },
  { label: 'Completed this week', value: '42', delta: '+11', icon: CheckCircle2, tone: 'text-success' },
  { label: 'Avg. time to sign', value: '4.2h', delta: '−22%', icon: TrendingUp, tone: 'text-primary' },
  { label: 'Needs attention', value: '2', delta: 'declined', icon: AlertTriangle, tone: 'text-destructive' },
]

const pipeline: { status: JobStatus; count: number }[] = [
  { status: 'draft', count: 5 },
  { status: 'out', count: 18 },
  { status: 'viewed', count: 7 },
  { status: 'completed', count: 42 },
]

export function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-5 py-7">
      {/* Metric strip */}
      <section>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card p-5">
              <div className="flex items-center justify-between">
                <m.icon className={cn('h-4 w-4', m.tone)} />
                <span className="font-mono text-[11px] text-muted-foreground">{m.delta}</span>
              </div>
              <p className="mt-4 font-serif text-3xl tracking-tight">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Pipeline</h2>
          <span className="font-mono text-xs text-muted-foreground">72 active jobs</span>
        </div>
        <div className="flex h-2.5 overflow-hidden rounded-full border border-border">
          {pipeline.map((p) => (
            <div
              key={p.status}
              className={cn('h-full', statusMeta[p.status].dot)}
              style={{ width: `${(p.count / 72) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {pipeline.map((p) => (
            <span key={p.status} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={cn('h-2 w-2 rounded-full', statusMeta[p.status].dot)} />
              {statusMeta[p.status].label}
              <span className="font-mono text-foreground">{p.count}</span>
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Jobs table */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Recent signature jobs</h2>
            <Link href="/jobs" className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/60 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Document</th>
                  <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Status</th>
                  <th className="hidden px-4 py-2.5 font-medium md:table-cell">Progress</th>
                  <th className="px-4 py-2.5 text-right font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const meta = statusMeta[job.status]
                  return (
                    <tr
                      key={job.id}
                      className="group border-b border-border last:border-0 transition-colors hover:bg-card/60"
                    >
                      <td className="px-4 py-3">
                        <Link href="/jobs" className="block">
                          <p className="font-medium text-foreground group-hover:text-primary">
                            {job.title}
                          </p>
                          <p className="font-mono text-[11px] text-muted-foreground">
                            {job.id} · {job.counterparty}
                          </p>
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium',
                            meta.tone,
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
                          {meta.label}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${(job.signed / job.recipients) * 100}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {job.signed}/{job.recipients}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground">
                        {job.updated}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activity feed */}
        <section id="audit">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Audit activity</h2>
            <span className="font-mono text-[10px] text-muted-foreground">live</span>
          </div>
          <div className="rounded-lg border border-border bg-card/40 p-4">
            <ol className="relative space-y-5 before:absolute before:left-[5px] before:top-1.5 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
              {activity.map((a, i) => (
                <li key={i} className="relative flex gap-3 pl-5">
                  <span
                    className={cn(
                      'absolute left-0 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-card',
                      a.tone === 'success' && 'bg-success',
                      a.tone === 'cyan' && 'bg-cyan',
                      a.tone === 'primary' && 'bg-primary',
                      a.tone === 'destructive' && 'bg-destructive',
                      a.tone === 'violet' && 'bg-accent',
                    )}
                  />
                  <div>
                    <p className="text-sm leading-snug text-foreground">
                      <span className="font-medium">{a.who}</span>{' '}
                      <span className="text-muted-foreground">{a.action}</span>
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{a.time}</p>
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
