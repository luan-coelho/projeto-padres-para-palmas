import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/linktree')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/linktree"!</div>
}
