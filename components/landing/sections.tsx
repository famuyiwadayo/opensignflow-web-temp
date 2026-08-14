import Link from 'next/link'
import {
  FileStack,
  Route,
  ShieldCheck,
  GitBranch,
  Webhook,
  ScrollText,
  ArrowUpRight,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function TrustBar() {
  const companies = ['Northwind', 'Aperture', 'Meridian', 'Halcyon', 'Vantage', 'Lumen Labs']
  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Trusted by operations teams at
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {companies.map((c) => (
            <span key={c} className="text-sm font-semibold tracking-tight text-foreground/50">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    n: '01',
    icon: FileStack,
    title: 'Prepare',
    body: 'Drop a PDF onto the artboard and place fields with pixel precision. Reusable templates keep every contract consistent.',
  },
  {
    n: '02',
    icon: Route,
    title: 'Route',
    body: 'Compose sequential or parallel signing orders. Conditional rules and reminders run automatically per recipient.',
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'Complete',
    body: 'Every event is hashed into a tamper-evident audit trail. Completed documents are sealed and archived instantly.',
  },
]

export function WorkflowSection() {
  return (
    <section id="workflow" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            The signing pipeline
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-balance">
            One workspace from draft to sealed record.
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="group bg-card p-7 transition-colors hover:bg-elevated">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-primary/12 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground/60">{step.n}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: GitBranch,
    title: 'Version-controlled templates',
    body: 'Fork, review, and roll back contract templates like code. Diff every field change across versions.',
    span: 'md:col-span-2',
  },
  {
    icon: Webhook,
    title: 'Event-driven',
    body: 'Signed, viewed, declined — stream every event to your stack via webhooks.',
    span: '',
  },
  {
    icon: ScrollText,
    title: 'Immutable audit trail',
    body: 'Cryptographic hash chain with IP, timestamp, and identity for each action.',
    span: '',
  },
  {
    icon: ShieldCheck,
    title: 'Self-host or cloud',
    body: 'Run it inside your VPC with a single container, or let us operate it. Your data never leaves your boundary.',
    span: 'md:col-span-2',
  },
]

export function FeatureGrid() {
  return (
    <section id="product" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Built for control
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-balance">
              The infrastructure serious signing demands.
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            See it in the dashboard
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className={cn(
                'rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/40',
                f.span,
              )}
            >
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-xl border border-border bg-elevated p-10 md:p-14">
          <div className="pointer-events-none absolute inset-0 grid-navy opacity-50" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, oklch(0.8 0.14 200 / 45%), transparent)' }}
          />
          <div className="relative max-w-xl">
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Ship your first signature job today.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Deploy the open-source core for free, or start on the managed cloud in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-sm px-5')}
              >
                Start free
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-11 rounded-sm px-5 font-mono text-sm',
                )}
              >
                $ docker run opensignflow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
