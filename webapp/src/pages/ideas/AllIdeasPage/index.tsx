import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { getViewIdeaRoute } from '../../../lib/routes.ts'
import { trpc } from '../../../lib/trpc.tsx'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage || false,
    onLoadMore: () => {
      if (!isFetchingNextPage && hasNextPage) {
        void fetchNextPage()
      }
    },
    disabled: Boolean(error),
    rootMargin: '0px 0px 250px 0px',
  })

  return (
    <Segment title="All Ideas">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.ideas}>
          {data.pages
            .flatMap((page) => page.ideas)
            .map((idea) => (
              <div key={idea.nick} className={css.idea}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                      {idea.name}
                    </Link>
                  }
                  description={idea.description}
                />
              </div>
            ))}
          {hasNextPage && (
            <div className={css.more}>
              <Loader ref={infiniteRef} type="section" />
            </div>
          )}
        </div>
      )}
    </Segment>
  )
}
