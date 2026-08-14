import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'
import { Dashboard } from '@/components/workspace/dashboard'

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb="Acme Inc" title="Overview" />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
