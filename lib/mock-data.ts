export type JobStatus = 'draft' | 'out' | 'viewed' | 'completed' | 'declined'

export type SignJob = {
  id: string
  title: string
  counterparty: string
  status: JobStatus
  recipients: number
  signed: number
  updated: string
  value: string
  owner: string
}

export const jobs: SignJob[] = [
  {
    id: 'MSA-2026-0417',
    title: 'Master Service Agreement',
    counterparty: 'Northwind Robotics',
    status: 'out',
    recipients: 3,
    signed: 1,
    updated: '2 min ago',
    value: '$240,000',
    owner: 'AO',
  },
  {
    id: 'NDA-2026-1188',
    title: 'Mutual NDA',
    counterparty: 'Aperture Systems',
    status: 'viewed',
    recipients: 2,
    signed: 0,
    updated: '18 min ago',
    value: '—',
    owner: 'RK',
  },
  {
    id: 'SOW-2026-0342',
    title: 'Statement of Work · Q3',
    counterparty: 'Meridian Freight',
    status: 'completed',
    recipients: 2,
    signed: 2,
    updated: '1 hr ago',
    value: '$88,500',
    owner: 'AO',
  },
  {
    id: 'EMP-2026-0091',
    title: 'Employment Offer',
    counterparty: 'D. Reyes',
    status: 'draft',
    recipients: 1,
    signed: 0,
    updated: '3 hr ago',
    value: '—',
    owner: 'JL',
  },
  {
    id: 'RNW-2026-0705',
    title: 'License Renewal',
    counterparty: 'Halcyon Media',
    status: 'declined',
    recipients: 2,
    signed: 0,
    updated: 'Yesterday',
    value: '$12,000',
    owner: 'RK',
  },
  {
    id: 'VEN-2026-0233',
    title: 'Vendor Agreement',
    counterparty: 'Lumen Labs',
    status: 'out',
    recipients: 4,
    signed: 3,
    updated: 'Yesterday',
    value: '$54,000',
    owner: 'AO',
  },
]

export const statusMeta: Record<
  JobStatus,
  { label: string; tone: string; dot: string }
> = {
  draft: { label: 'Draft', tone: 'text-muted-foreground bg-muted', dot: 'bg-muted-foreground' },
  out: { label: 'Out for signature', tone: 'text-warning bg-warning/12', dot: 'bg-warning' },
  viewed: { label: 'Viewed', tone: 'text-cyan bg-cyan/12', dot: 'bg-cyan' },
  completed: { label: 'Completed', tone: 'text-success bg-success/12', dot: 'bg-success' },
  declined: { label: 'Declined', tone: 'text-destructive bg-destructive/12', dot: 'bg-destructive' },
}

export const activity = [
  { who: 'Northwind Robotics', action: 'signed MSA-2026-0417', time: '2 min ago', tone: 'success' },
  { who: 'Aperture Systems', action: 'opened NDA-2026-1188', time: '18 min ago', tone: 'cyan' },
  { who: 'You', action: 'sent SOW-2026-0342 to 2 recipients', time: '1 hr ago', tone: 'primary' },
  { who: 'Halcyon Media', action: 'declined RNW-2026-0705', time: 'Yesterday', tone: 'destructive' },
  { who: 'System', action: 'sealed audit trail for VEN-2026-0233', time: 'Yesterday', tone: 'violet' },
]
