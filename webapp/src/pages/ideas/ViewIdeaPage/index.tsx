import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { canBlockIdeas, canEditIdea } from '@ideanick/backend/src/utils/can'
import { format } from 'date-fns'
import { Alert } from '../../../components/Alert'
import { Button, LinkButton } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Icon } from '../../../components/Icon'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form.tsx'
import { withPageWrapper } from '../../../lib/pageWrapper.tsx'
import { getEditIdeaRoute, getViewIdeaRoute } from '../../../lib/routes.ts'
import { trpc } from '../../../lib/trpc.tsx'
import css from './index.module.scss'

const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useContext()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick })
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick })
    },
  })

  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
      }}
    >
      <Icon size={32} className={css.likeIcon} name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}

const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useContext()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  )
}

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = getViewIdeaRoute.useParams()
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, ctx, checkExists }) => {
    return {
      idea: checkExists(queryResult.data.idea, 'Idea not found'),
      me: ctx.me,
    }
  },
  showLoaderOnFetching: false,
  title: ({ idea }) => idea.name,
})(({ idea, me }) => {
  return (
    <div>
      <Segment title={idea.name} description={idea.description}>
        <div className={css.createdAt}>Created At: {format(new Date(idea.createdAt), 'yyyy-MM-dd')}</div>
        <div className={css.author}>
          Author: {idea.author.nick}
          {idea.author.name ? ` (${idea.author.name})` : ''}
        </div>
        <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
        <div className={css.likes}>
          Likes: {idea.likesCount}
          {me && (
            <>
              <br />
              <LikeButton idea={idea} />
            </>
          )}
        </div>
        {canEditIdea(me, idea) && (
          <div className={css.editButton}>
            <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
          </div>
        )}
        {canBlockIdeas(me) && (
          <div className={css.blockIdea}>
            <BlockIdea idea={idea} />
          </div>
        )}
      </Segment>
    </div>
  )
})
