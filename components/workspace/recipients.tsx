import { UserPlus, Search, Download, MoreHorizontal } from 'lucide-react'
import { recipients, recipientStatusMeta } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const avatarTones = [
  'from-primary to-accent',
  'from-cyan to-primary',
  'from-accent to-cyan',
  'from-success to-cyan',
  'from-warning to-destructive',
  'from-accent to-primary',
]

const roleTone: Record<string, string> = {
  Signer: 'text-primary bg-primary/12',
  Approver: 'text-accent bg-accent/12',
  CC: 'text-muted-foreground bg-muted',
  Witness: 'text-cyan bg-cyan/12',
}

export function RecipientsView() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-7">
      {/* Header actions */}
      <section className="flex flex-wrap items-center gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Recipient directory</h2>
          <p className="text-xs text-muted-foreground">{recipients.length} contacts across 5 organizations</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="flex h-8 items-center gap-2 rounded-sm border border-border bg-card px-2.5 text-muted-foreground focus-within:border-primary/50">
            <Search className="h-3.5 w-3.5" />
            <input
              placeholder="Search recipients…"
              className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            />
          </label>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-primary px-3 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <UserPlus className="h-3.5 w-3.5" /> Add recipient
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card/60 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Recipient</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">Role</th>
              <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Status</th>
              <th className="hidden px-4 py-2.5 font-medium lg:table-cell">Documents</th>
              <th className="px-4 py-2.5 text-right font-medium">Last active</th>
              <th className="w-10 px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {recipients.map((r, i) => {
              const meta = recipientStatusMeta[r.status]
              return (
                <tr
                  key={r.id}
                  className="group border-b border-border last:border-0 transition-colors hover:bg-card/60"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-gradient-to-br text-xs font-semibold text-primary-foreground',
                          avatarTones[i % avatarTones.length],
                        )}
                      >
                        {r.name.split(' ').map((p) => p[0]).join('')}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{r.name}</p>
                        <p className="truncate font-mono text-[11px] text-muted-foreground">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className={cn('rounded-sm px-2 py-0.5 text-[11px] font-medium', roleTone[r.role])}>
                      {r.role}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={cn('inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium', meta.tone)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
                      {meta.label}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-success"
                          style={{ width: `${(r.completed / r.documents) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {r.completed}/{r.documents}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground">{r.lastActive}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      aria-label={`Actions for ${r.name}`}
                      className="grid h-7 w-7 place-items-center rounded-sm text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}
