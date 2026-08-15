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

export type Recipient = {
  id: string
  name: string
  email: string
  org: string
  role: 'Signer' | 'Approver' | 'CC' | 'Witness'
  status: 'active' | 'pending' | 'blocked'
  documents: number
  completed: number
  lastActive: string
}

export const recipients: Recipient[] = [
  { id: 'r1', name: 'Mara Lindqvist', email: 'mara@northwind.io', org: 'Northwind Robotics', role: 'Signer', status: 'active', documents: 14, completed: 13, lastActive: '2 min ago' },
  { id: 'r2', name: 'Devon Reyes', email: 'devon.reyes@aperture.com', org: 'Aperture Systems', role: 'Approver', status: 'pending', documents: 6, completed: 4, lastActive: '18 min ago' },
  { id: 'r3', name: 'Priya Chandran', email: 'priya@meridianfreight.com', org: 'Meridian Freight', role: 'Signer', status: 'active', documents: 9, completed: 9, lastActive: '1 hr ago' },
  { id: 'r4', name: 'Tomas Berg', email: 'tberg@halcyonmedia.com', org: 'Halcyon Media', role: 'Signer', status: 'blocked', documents: 3, completed: 1, lastActive: 'Yesterday' },
  { id: 'r5', name: 'Aiko Tanaka', email: 'aiko@lumenlabs.dev', org: 'Lumen Labs', role: 'Witness', status: 'active', documents: 21, completed: 20, lastActive: '3 hr ago' },
  { id: 'r6', name: 'Grace Mensah', email: 'grace.mensah@acme.co', org: 'Acme Inc', role: 'CC', status: 'active', documents: 32, completed: 32, lastActive: '5 min ago' },
]

export const recipientStatusMeta: Record<
  Recipient['status'],
  { label: string; tone: string; dot: string }
> = {
  active: { label: 'Active', tone: 'text-success bg-success/12', dot: 'bg-success' },
  pending: { label: 'Pending', tone: 'text-warning bg-warning/12', dot: 'bg-warning' },
  blocked: { label: 'Blocked', tone: 'text-destructive bg-destructive/12', dot: 'bg-destructive' },
}

export type InboxItem = {
  id: string
  title: string
  from: string
  org: string
  received: string
  due: string
  action: 'sign' | 'approve' | 'review'
  unread: boolean
}

export const inbox: InboxItem[] = [
  { id: 'in1', title: 'Master Service Agreement', from: 'Mara Lindqvist', org: 'Northwind Robotics', received: '2 min ago', due: 'Due in 2 days', action: 'sign', unread: true },
  { id: 'in2', title: 'Q3 Budget Approval', from: 'Grace Mensah', org: 'Acme Inc · Finance', received: '40 min ago', due: 'Due today', action: 'approve', unread: true },
  { id: 'in3', title: 'Vendor Agreement · Lumen Labs', from: 'Aiko Tanaka', org: 'Lumen Labs', received: '2 hr ago', due: 'Due in 5 days', action: 'review', unread: true },
  { id: 'in4', title: 'Contractor NDA', from: 'Devon Reyes', org: 'Aperture Systems', received: 'Yesterday', due: 'Due in 1 day', action: 'sign', unread: true },
  { id: 'in5', title: 'Renewal · Halcyon Media', from: 'Tomas Berg', org: 'Halcyon Media', received: '2 days ago', due: 'No deadline', action: 'review', unread: false },
]

export const inboxActionMeta: Record<
  InboxItem['action'],
  { label: string; tone: string }
> = {
  sign: { label: 'Sign', tone: 'text-primary bg-primary/12' },
  approve: { label: 'Approve', tone: 'text-accent bg-accent/12' },
  review: { label: 'Review', tone: 'text-cyan bg-cyan/12' },
}

export type Integration = {
  id: string
  name: string
  category: string
  description: string
  connected: boolean
  initials: string
  accent: string
}

export const integrations: Integration[] = [
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', description: 'Auto-attach signed contracts to opportunities and sync status.', connected: true, initials: 'SF', accent: 'from-cyan to-primary' },
  { id: 'slack', name: 'Slack', category: 'Notifications', description: 'Post signing events and reminders to your team channels.', connected: true, initials: 'SL', accent: 'from-accent to-primary' },
  { id: 'gdrive', name: 'Google Drive', category: 'Storage', description: 'Archive completed documents and audit trails automatically.', connected: true, initials: 'GD', accent: 'from-success to-cyan' },
  { id: 'stripe', name: 'Stripe', category: 'Payments', description: 'Collect payment on signature completion for order forms.', connected: false, initials: 'ST', accent: 'from-primary to-accent' },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', description: 'Trigger workflows when a deal document is fully executed.', connected: false, initials: 'HS', accent: 'from-warning to-destructive' },
  { id: 'zapier', name: 'Zapier', category: 'Automation', description: 'Connect signing events to 6,000+ apps with custom Zaps.', connected: false, initials: 'ZP', accent: 'from-accent to-cyan' },
]

export type SignatureDoc = {
  id: string
  title: string
  status: JobStatus
  recipients: number
  signed: number
  updated: string
  format: 'PDF' | 'DOCX'
  pages: number
}

export const signatureDocs: SignatureDoc[] = [
  { id: 'MSA-2026-0417', title: 'Master Service Agreement', status: 'out', recipients: 3, signed: 1, updated: '2 min ago', format: 'PDF', pages: 12 },
  { id: 'SOW-2026-0342', title: 'Statement of Work · Q3', status: 'completed', recipients: 2, signed: 2, updated: '1 hr ago', format: 'PDF', pages: 6 },
  { id: 'NDA-2026-1188', title: 'Mutual NDA', status: 'viewed', recipients: 2, signed: 0, updated: '18 min ago', format: 'DOCX', pages: 3 },
  { id: 'VEN-2026-0233', title: 'Vendor Agreement', status: 'out', recipients: 4, signed: 3, updated: 'Yesterday', format: 'PDF', pages: 9 },
  { id: 'EMP-2026-0091', title: 'Employment Offer', status: 'draft', recipients: 1, signed: 0, updated: '3 hr ago', format: 'PDF', pages: 4 },
  { id: 'RNW-2026-0705', title: 'License Renewal', status: 'declined', recipients: 2, signed: 0, updated: 'Yesterday', format: 'DOCX', pages: 5 },
  { id: 'PRT-2026-0510', title: 'Partnership MOU', status: 'completed', recipients: 3, signed: 3, updated: '2 days ago', format: 'PDF', pages: 8 },
  { id: 'LSE-2026-0044', title: 'Office Lease Amendment', status: 'out', recipients: 2, signed: 1, updated: '3 days ago', format: 'PDF', pages: 14 },
]
