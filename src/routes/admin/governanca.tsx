import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/governanca')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/governanca"!</div>
}
