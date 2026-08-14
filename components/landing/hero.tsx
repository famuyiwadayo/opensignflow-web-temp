import Link from 'next/link'
import { ArrowUpRight, Terminal, ShieldCheck, PenLine, Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-navy opacity-60" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.64 0.2 288 / 55%), transparent)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Open-source · self-hostable · audit-ready
          </span>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance text-foreground sm:text-6xl lg:text-[4.25rem]">
            Signatures as{' '}
            <span className="italic text-primary">auditable</span> infrastructure.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            OpenSignFlow gives operations teams a precise, developer-grade workspace to prepare,
            route, and complete signature jobs — without handing your documents to a black box.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-sm px-5 text-[0.95rem]')}
            >
              Open the workspace
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/editor"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-11 rounded-sm px-5 text-[0.95rem]',
              )}
            >
              Explore the editor
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6">
            {[
              { icon: ShieldCheck, label: 'SOC 2 Type II' },
              { icon: PenLine, label: 'eIDAS & ESIGN' },
              { icon: Terminal, label: 'Full REST + webhooks' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <HeroDocument />
      </div>
    </section>
  )
}

function HeroDocument() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-accent/15" />
      {/* window chrome */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            MSA-2026-0417 · Northwind Robotics
          </span>
          <span className="ml-auto rounded-sm bg-warning/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warning">
            Awaiting 2
          </span>
        </div>
        {/* canvas */}
        <div className="dots-canvas bg-canvas p-5">
          <div className="mx-auto max-w-sm rounded-sm bg-white px-6 py-7 shadow-lg shadow-black/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-foreground/50">
              Master Service Agreement
            </p>
            <div className="mt-3 space-y-1.5">
              <div className="h-2.5 w-4/5 rounded-full bg-canvas-foreground/85" />
              <div className="h-2 w-full rounded-full bg-canvas-foreground/15" />
              <div className="h-2 w-11/12 rounded-full bg-canvas-foreground/15" />
              <div className="h-2 w-3/4 rounded-full bg-canvas-foreground/15" />
            </div>
            <div className="mt-5 space-y-1.5">
              <div className="h-2 w-full rounded-full bg-canvas-foreground/15" />
              <div className="h-2 w-5/6 rounded-full bg-canvas-foreground/15" />
            </div>
            {/* signature field */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-sm border-2 border-dashed border-primary/70 bg-primary/5 p-2.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-primary/90">
                  Signature · You
                </p>
                <p className="mt-2 font-serif text-base italic text-canvas-foreground">
                  A. Okafor
                </p>
              </div>
              <div className="rounded-sm border-2 border-dashed border-accent/60 bg-accent/5 p-2.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-accent">
                  Signature · Client
                </p>
                <p className="mt-2 flex items-center gap-1 text-[11px] text-canvas-foreground/40">
                  Pending
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* floating status chip */}
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-md border border-border bg-elevated/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-sm bg-success/15 text-success">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-medium text-foreground">Recipient 1 signed</p>
          <p className="font-mono text-[10px] text-muted-foreground">verified · 2 min ago</p>
        </div>
      </div>
    </div>
  )
}
