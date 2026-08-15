import { WorkspaceSidebar } from '@/components/workspace/sidebar'
import { WorkspaceTopbar } from '@/components/workspace/topbar'
import { InboxView } from '@/components/workspace/inbox'

export default function InboxPage() {
  return (
    <div className="flex min-h-dvh">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopbar breadcrumb="Acme Inc" title="Inbox" />
        <main className="flex-1">
          <InboxView />
        </main>
      </div>
    </div>
  )
}