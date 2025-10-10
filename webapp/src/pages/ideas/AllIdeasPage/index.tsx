import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Link } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form.tsx'
import { getViewIdeaRoute } from '../../../lib/routes.ts'
import { trpc } from '../../../lib/trpc.tsx'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const { formik } = useForm({
    initialValues: {
      search: '',
    },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })

  const search = useDebounce(formik.values.search, 500)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
        search,
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
      <div className={css.filter}>
        <Input maxWidth="100%" label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found to search</Alert>
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
                >
                  Likes: {idea.likesCount}
                </Segment>
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
