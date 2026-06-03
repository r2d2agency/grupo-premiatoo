import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/garantias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/garantias"!</div>
}
