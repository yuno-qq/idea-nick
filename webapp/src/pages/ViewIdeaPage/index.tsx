import { useParams } from 'react-router-dom'
import type { ViewIdeaRouteParams } from '../../lib/routes.ts'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams<ViewIdeaRouteParams>()

  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>Description</p>
      <div>
        <p>Text 1 of Idea 1</p>
        <p>Text 2 of Idea 1</p>
        <p>Text 3 of Idea 1</p>
      </div>
    </div>
  )
}
