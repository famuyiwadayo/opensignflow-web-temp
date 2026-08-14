import Link from 'next/link'
import { Star, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Product', href: '/#product' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Editor', href: '/editor' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="OpenSignFlow home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com"
            className="hidden items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Star className="h-3.5 w-3.5 text-warning" />
            12.4k
          </Link>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'rounded-sm')}
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'rounded-sm font-medium',
            )}
          >
            Start free
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
