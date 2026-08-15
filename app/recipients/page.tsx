import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'
import { RecipientsView } from '@/components/workspace/recipients'

export default function RecipientsPage() {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb="Acme Inc" title="Inbox" />
        <main className="flex-1">
          <RecipientsView />
        </main>
      </div>
    </div>
  )
}