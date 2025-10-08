import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { withPageWrapper } from '../../lib/pageWrapper.tsx'
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'
import css from './index.module.scss'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, ctx, checkExists }) => {
    return {
      idea: checkExists(queryResult.data.idea, 'Idea not found'),
      me: ctx.me,
    }
  },
})(({ idea, me }) => {
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
})
