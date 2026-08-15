import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'
import { SignaturesOverview } from '@/components/workspace/signatures'

export default function SignaturesPage() {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb="Signatures" title="Signatures" />
        <main className="flex-1">
          <SignaturesOverview />
        </main>
      </div>
    </div>
  )
}