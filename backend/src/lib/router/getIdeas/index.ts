import _ from 'lodash'
import { ideas } from '../../ideas'
import { trpc } from '../../trpc'

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
})
