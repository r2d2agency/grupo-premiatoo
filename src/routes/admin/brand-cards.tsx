import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/brand-cards')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/brand-cards"!</div>
}
