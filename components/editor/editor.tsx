'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MousePointer2,
  PenLine,
  Type,
  Calendar,
  CheckSquare,
  Hash,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Minus,
  Plus,
  Send,
  Layers,
  Eye,
  Lock,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FieldType = 'signature' | 'text' | 'date' | 'checkbox' | 'initials'

type Field = {
  id: string
  type: FieldType
  label: string
  recipient: 0 | 1
  x: number
  y: number
  w: number
  h: number
  required: boolean
  page: number
}

const recipients = [
  { name: 'Ada Okafor', role: 'Sender', color: 'var(--cyan)', initials: 'AO' },
  { name: 'M. Chen', role: 'Client · Northwind', color: 'var(--violet)', initials: 'MC' },
]

const initialFields: Field[] = [
  { id: 'f1', type: 'signature', label: 'Signature', recipient: 0, x: 8, y: 68, w: 38, h: 11, required: true, page: 1 },
  { id: 'f2', type: 'date', label: 'Date signed', recipient: 0, x: 54, y: 68, w: 28, h: 7, required: true, page: 1 },
  { id: 'f3', type: 'signature', label: 'Signature', recipient: 1, x: 8, y: 84, w: 38, h: 11, required: true, page: 1 },
  { id: 'f4', type: 'text', label: 'Full legal name', recipient: 1, x: 54, y: 84, w: 34, h: 7, required: true, page: 1 },
  { id: 'f5', type: 'initials', label: 'Initials', recipient: 1, x: 8, y: 40, w: 16, h: 7, required: false, page: 1 },
]

const tools: { type: FieldType | 'select'; icon: typeof PenLine; label: string }[] = [
  { type: 'select', icon: MousePointer2, label: 'Select' },
  { type: 'signature', icon: PenLine, label: 'Signature' },
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'date', icon: Calendar, label: 'Date' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
  { type: 'initials', icon: Hash, label: 'Initials' },
]

const recipientColor = (r: 0 | 1) => (r === 0 ? 'var(--cyan)' : 'var(--violet)')

export function Editor() {
  const [tool, setTool] = useState<FieldType | 'select'>('select')
  const [selected, setSelected] = useState<string | null>('f1')
  const [zoom, setZoom] = useState(100)
  const [fields] = useState<Field[]>(initialFields)

  const selectedField = fields.find((f) => f.id === selected) ?? null

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-card/60 px-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          <Logo showWordmark={false} />
        </Link>
        <div className="h-5 w-px bg-border" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Master Service Agreement</p>
        </div>
        <span className="rounded-sm bg-warning/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warning">
          Draft
        </span>

        {/* zoom */}
        <div className="ml-auto flex items-center gap-1 rounded-sm border border-border bg-background px-1">
          <button
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="grid h-6 w-6 place-items-center rounded-sm text-muted-foreground hover:text-foreground"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-xs text-muted-foreground">{zoom}%</span>
          <button
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="grid h-6 w-6 place-items-center rounded-sm text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex -space-x-1.5">
          {recipients.map((r) => (
            <span
              key={r.initials}
              title={r.name}
              className="grid h-6 w-6 place-items-center rounded-full border-2 border-card text-[10px] font-semibold text-primary-foreground"
              style={{ background: r.color }}
            >
              {r.initials}
            </span>
          ))}
        </div>
        <Link href="/sign" className={cn(buttonVariants({ size: 'sm' }), 'rounded-sm')}>
          <Send className="h-3.5 w-3.5" />
          Send
        </Link>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left rail: tools */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border bg-card/40 py-2">
          {tools.map((t) => (
            <button
              key={t.type}
              title={t.label}
              onClick={() => setTool(t.type)}
              className={cn(
                'grid h-9 w-9 place-items-center rounded-sm transition-colors',
                tool === t.type
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <t.icon className="h-[18px] w-[18px]" />
            </button>
          ))}
        </div>

        {/* Layers panel */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold">Fields</span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              {fields.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <p className="px-1.5 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
              Page 1
            </p>
            <ul className="space-y-0.5">
              {fields.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => setSelected(f.id)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-sm px-1.5 py-1.5 text-left text-xs transition-colors',
                      selected === f.id
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60',
                    )}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{ background: recipientColor(f.recipient) }}
                    />
                    <FieldIcon type={f.type} />
                    <span className="truncate">{f.label}</span>
                    {f.required && (
                      <span className="ml-auto text-[10px] text-accent">*</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border p-2">
            <p className="px-1.5 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
              Recipients
            </p>
            {recipients.map((r) => (
              <div key={r.initials} className="flex items-center gap-2 rounded-sm px-1.5 py-1.5">
                <span className="h-2 w-2 rounded-[2px]" style={{ background: r.color }} />
                <span className="text-xs text-foreground">{r.name}</span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">{r.role}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <div className="relative min-w-0 flex-1 overflow-auto dots-canvas bg-[oklch(0.16_0.03_258)]">
          {/* ruler top */}
          <div className="sticky top-0 z-10 flex h-6 border-b border-border bg-background/80 pl-6 backdrop-blur">
            <Ruler />
          </div>
          <div className="flex">
            {/* ruler left */}
            <div className="sticky left-0 z-10 w-6 shrink-0 border-r border-border bg-background/80 backdrop-blur" />
            <div className="flex flex-1 justify-center px-10 py-10">
              <Artboard
                zoom={zoom}
                fields={fields}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        </div>

        {/* Inspector */}
        <aside className="hidden w-64 shrink-0 flex-col border-l border-border bg-card/40 lg:flex">
          <div className="border-b border-border px-3 py-2.5">
            <span className="text-xs font-semibold">Inspector</span>
          </div>
          {selectedField ? (
            <Inspector field={selectedField} />
          ) : (
            <div className="p-4 text-xs text-muted-foreground">
              Select a field to edit its properties.
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function FieldIcon({ type }: { type: FieldType }) {
  const map = { signature: PenLine, text: Type, date: Calendar, checkbox: CheckSquare, initials: Hash }
  const Icon = map[type]
  return <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
}

function Ruler() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="flex h-full items-end">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={cn('shrink-0 border-l border-border/60', i % 5 === 0 ? 'h-3' : 'h-1.5')}
            style={{ width: 16 }}
          />
        ))}
      </div>
    </div>
  )
}

function Artboard({
  zoom,
  fields,
  selected,
  onSelect,
}: {
  zoom: number
  fields: Field[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  const scale = zoom / 100
  return (
    <div
      className="origin-top"
      style={{ transform: `scale(${scale})`, transition: 'transform 120ms ease-out' }}
    >
      {/* artboard label */}
      <p className="mb-2 font-mono text-[11px] text-primary">Page 1 · 612 × 792</p>
      <div className="relative w-[520px] rounded-sm bg-white shadow-2xl shadow-black/50 ring-1 ring-black/5">
        {/* PDF content */}
        <div className="px-12 py-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-foreground/40">
            Contract № MSA-2026-0417
          </p>
          <h2 className="mt-4 font-serif text-2xl tracking-tight text-canvas-foreground">
            Master Service Agreement
          </h2>
          <div className="mt-6 space-y-2">
            {[95, 88, 92, 70].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-canvas-foreground/12" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-2.5 w-40 rounded-full bg-canvas-foreground/70" />
            {[90, 96, 84].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-canvas-foreground/12" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-16 space-y-2">
            <div className="h-2 w-32 rounded-full bg-canvas-foreground/40" />
          </div>
          <div className="mt-24 grid grid-cols-2 gap-6">
            <div className="border-t border-canvas-foreground/25 pt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
              Provider signature
            </div>
            <div className="border-t border-canvas-foreground/25 pt-1 font-mono text-[9px] uppercase tracking-wide text-canvas-foreground/40">
              Client signature
            </div>
          </div>
        </div>

        {/* Placed fields overlay */}
        {fields.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className="group absolute rounded-[3px] border-2 text-left transition-shadow"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: `${f.w}%`,
              height: `${f.h}%`,
              borderColor: recipientColor(f.recipient),
              background: `color-mix(in oklch, ${recipientColor(f.recipient)} 12%, transparent)`,
              boxShadow: selected === f.id ? `0 0 0 2px var(--background), 0 0 0 4px ${recipientColor(f.recipient)}` : undefined,
            }}
          >
            <span
              className="absolute -top-[18px] left-0 flex items-center gap-1 rounded-[3px] px-1.5 py-0.5 text-[9px] font-medium text-white"
              style={{ background: recipientColor(f.recipient) }}
            >
              <FieldIcon type={f.type} />
              {f.label}
            </span>
            {f.type === 'signature' && (
              <span className="flex h-full items-center pl-2 font-serif text-sm italic text-canvas-foreground/40">
                {f.recipient === 0 ? 'Sign here' : ''}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Inspector({ field }: { field: Field }) {
  const r = recipients[field.recipient]
  return (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="rounded-sm border border-border bg-background p-3">
        <div className="flex items-center gap-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-sm text-white"
            style={{ background: recipientColor(field.recipient) }}
          >
            <FieldIcon type={field.type} />
          </span>
          <div>
            <p className="text-sm font-medium capitalize">{field.type}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{field.id}</p>
          </div>
        </div>
      </div>

      <Section title="Assigned to">
        <div className="flex items-center gap-2 rounded-sm border border-border bg-background px-2.5 py-2">
          <span
            className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white"
            style={{ background: r.color }}
          >
            {r.initials}
          </span>
          <span className="text-sm">{r.name}</span>
        </div>
      </Section>

      <Section title="Label">
        <div className="rounded-sm border border-border bg-background px-2.5 py-2 text-sm">
          {field.label}
        </div>
      </Section>

      <Section title="Position">
        <div className="grid grid-cols-2 gap-2">
          <Prop label="X" value={`${field.x}%`} />
          <Prop label="Y" value={`${field.y}%`} />
          <Prop label="W" value={`${field.w}%`} />
          <Prop label="H" value={`${field.h}%`} />
        </div>
      </Section>

      <Section title="Options">
        <div className="space-y-1.5">
          <Toggle icon={Lock} label="Required" active={field.required} />
          <Toggle icon={Eye} label="Read-only" active={false} />
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
        {title}
      </p>
      {children}
    </div>
  )
}

function Prop({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-sm border border-border bg-background px-2 py-1.5">
      <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
      <span className="ml-auto font-mono text-xs text-foreground">{value}</span>
    </div>
  )
}

function Toggle({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Lock
  label: string
  active: boolean
}) {
  return (
    <div className="flex items-center gap-2 rounded-sm border border-border bg-background px-2.5 py-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm">{label}</span>
      <span
        className={cn(
          'ml-auto flex h-4 w-7 items-center rounded-full p-0.5 transition-colors',
          active ? 'bg-primary' : 'bg-muted',
        )}
      >
        <span
          className={cn(
            'h-3 w-3 rounded-full bg-white transition-transform',
            active && 'translate-x-3',
          )}
        />
      </span>
    </div>
  )
}
