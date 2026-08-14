import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'
import { JobProgress } from '@/components/workspace/job-progress'

export default function JobsPage() {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb="Signature jobs" title="MSA-2026-0417" />
        <main className="flex-1">
          <JobProgress />
        </main>
      </div>
    </div>
  )
}
