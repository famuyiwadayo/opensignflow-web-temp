'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileSignature,
  Inbox,
  FileText,
  Users,
  ScrollText,
  Settings,
  Plug,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const groups = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Signature jobs', href: '/jobs', icon: FileSignature },
      { label: 'Inbox', href: '/inbox', icon: Inbox, badge: '4' },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Signatures', href: '/signatures', icon: FileText },
      { label: 'Recipients', href: '/recipients', icon: Users },
      { label: 'Audit log', href: '/dashboard#audit', icon: ScrollText },
    ],
  },
  {
    label: 'Configure',
    items: [
      { label: 'Integrations', href: '/integrations', icon: Plug },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export function WorkspaceSidebar() {
  const pathname = usePathname()
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-card/40 lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/" aria-label="OpenSignFlow home">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm transition-colors',
                        active
                          ? 'bg-primary/12 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto rounded-sm bg-accent/20 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-sm px-2 py-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
            AO
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">Ada Okafor</p>
            <p className="truncate font-mono text-[10px] text-muted-foreground">Owner · Acme Inc</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
