import type { ReactNode } from 'react'
import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'

export function WorkspaceShell({
  breadcrumb,
  title,
  children,
}: {
  breadcrumb: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb={breadcrumb} title={title} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
