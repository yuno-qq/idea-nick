export const App = () => {
  const ideas = [
    {
      nick: 'cool-idia-nick-1',
      name: 'Idea 1',
      description: 'Idea 1 description...',
    },
    {
      nick: 'cool-idia-nick-2',
      name: 'Idea 2',
      description: 'Idea 2 description...',
    },
    {
      nick: 'cool-idia-nick-3',
      name: 'Idea 3',
      description: 'Idea 3 description...',
    },
  ]

  return (
    <div>
      <h1>Idea nick</h1>

      {ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
