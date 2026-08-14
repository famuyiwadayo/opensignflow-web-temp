import Link from 'next/link'
import { Logo } from '@/components/logo'

const columns = [
  {
    title: 'Platform',
    links: ['Document editor', 'Signature routing', 'Audit trail', 'Templates', 'Self-hosting'],
  },
  {
    title: 'Developers',
    links: ['REST API', 'Webhooks', 'CLI', 'SDKs', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Security', 'Compliance', 'Careers', 'Contact'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The open-source signing layer for teams that treat every signature as auditable
              infrastructure.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              AGPL-3.0 · v3.2.0
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OpenSignFlow contributors.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">SOC 2</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
