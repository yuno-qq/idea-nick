import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { useMe } from '../../lib/ctx.tsx'
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'
import css from './index.module.scss'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })
  const me = useMe()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>...Loading</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  const idea = getIdeaResult.data.idea

  if (!idea) {
    return <span>Idea not found</span>
  }

  return (
    <div>
      <Segment title={idea.name} description={idea.description}>
        <div className={css.createdAt}>Created At: {format(new Date(idea.createdAt), 'yyyy-MM-dd')}</div>
        <div className={css.author}>Author: {idea.author.nick}</div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
        {me?.id === idea.authorId && (
          <div className={css.editButton}>
            <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
          </div>
        )}
      </Segment>
    </div>
  )
}
