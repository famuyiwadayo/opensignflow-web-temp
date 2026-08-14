import Link from 'next/link'
import { Search, Bell, Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WorkspaceTopbar({
  title,
  breadcrumb,
}: {
  title: string
  breadcrumb?: string
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl">
      <div className="min-w-0">
        {breadcrumb && (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {breadcrumb}
          </p>
        )}
        <h1 className="truncate text-sm font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="ml-auto hidden items-center md:flex">
        <label className="flex h-8 items-center gap-2 rounded-sm border border-border bg-card/60 px-2.5 text-muted-foreground focus-within:border-primary/50">
          <Search className="h-3.5 w-3.5" />
          <input
            placeholder="Search jobs, recipients…"
            className="w-48 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="rounded-sm border border-border px-1 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </label>
      </div>
      <button
        aria-label="Notifications"
        className="relative grid h-8 w-8 place-items-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
      </button>
      <Link
        href="/editor"
        className={cn(buttonVariants({ size: 'sm' }), 'rounded-sm')}
      >
        <Plus className="h-3.5 w-3.5" />
        New document
      </Link>
    </header>
  )
}
