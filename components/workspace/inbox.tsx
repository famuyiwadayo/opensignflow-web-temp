'use client'

import { useState } from 'react'
import { Inbox as InboxIcon, Clock, FileText, CheckCheck } from 'lucide-react'
import { inbox, inboxActionMeta } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const folders = [
  { label: 'Action required', count: 4, active: true },
  { label: 'Waiting on others', count: 12, active: false },
  { label: 'Completed', count: 142, active: false },
  { label: 'Drafts', count: 5, active: false },
]

export function InboxView() {
  const [selected, setSelected] = useState(inbox[0].id)
  const active = inbox.find((i) => i.id === selected) ?? inbox[0]
  const actionMeta = inboxActionMeta[active.action]

  return (
    <div className="grid min-h-[calc(100dvh-3.5rem)] grid-cols-1 lg:grid-cols-[220px_1fr_1.1fr]">
      {/* Folders */}
      <aside className="hidden border-r border-border p-3 lg:block">
        <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Folders
        </p>
        <ul className="space-y-0.5">
          {folders.map((f) => (
            <li key={f.label}>
              <button
                className={cn(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                  f.active
                    ? 'bg-primary/12 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <InboxIcon className="h-4 w-4" />
                <span className="truncate">{f.label}</span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">{f.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Message list */}
      <section className="border-r border-border">
        <div className="flex h-11 items-center justify-between border-b border-border px-4">
          <span className="text-xs font-semibold">Action required</span>
          <span className="font-mono text-[10px] text-muted-foreground">4 unread</span>
        </div>
        <ul>
          {inbox.map((item) => {
            const meta = inboxActionMeta[item.action]
            const isActive = item.id === selected
            return (
              <li key={item.id}>
                <button
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    'flex w-full flex-col gap-1.5 border-b border-border px-4 py-3 text-left transition-colors',
                    isActive ? 'bg-primary/8' : 'hover:bg-card/60',
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                    <span className={cn('truncate text-sm', item.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                      {item.title}
                    </span>
                    <span className={cn('ml-auto shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-medium', meta.tone)}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {item.from} · {item.org}
                  </p>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{item.received}</span>
                    <span>{item.due}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Preview pane */}
      <section className="hidden flex-col lg:flex">
        <div className="flex h-11 items-center gap-2 border-b border-border px-4">
          <span className={cn('rounded-sm px-2 py-0.5 text-[11px] font-medium', actionMeta.tone)}>
            {actionMeta.label}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{active.due}</span>
          <button className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-sm bg-primary px-3 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <CheckCheck className="h-3.5 w-3.5" /> Open &amp; {actionMeta.label.toLowerCase()}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            From {active.from} · {active.org}
          </p>
          <h2 className="mt-2 text-balance font-serif text-2xl tracking-tight">{active.title}</h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            You have been requested to {active.action} this document. Please review all pages before
            completing your action. A sealed audit trail is generated once every recipient has responded.
          </p>

          {/* Document preview */}
          <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="grid h-14 w-11 place-items-center rounded-sm bg-[oklch(0.96_0.005_260)] text-muted-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{active.title}.pdf</p>
              <p className="font-mono text-[11px] text-muted-foreground">Encrypted · SHA-256 verified</p>
            </div>
            <button className="ml-auto rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
              Preview
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card/40 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Timeline</p>
            <ol className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Sent to you · {active.received}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" /> Awaiting your response
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}
