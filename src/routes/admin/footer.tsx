import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/footer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/footer"!</div>
}
