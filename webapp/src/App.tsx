export const App = () => {
  return (
    <div>
      <h1>Idea nick</h1>

      {[{name: 'asd', description: 'adas', nick: 'squad001'}].map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
