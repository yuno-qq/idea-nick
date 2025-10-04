import { trpc } from '../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  const x: string = 'asdad'
  console.info(x)

  if (Math.round(4.2)) {
    console.info(x)
  }

  if (isLoading || isFetching) {
    return <span>...Loading</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>Idea nick</h1>
      {data.ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
