import { ideas } from '../../ideas'
import { trpc } from '../../trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  if (ideas.find((idea) => idea.nick === input.nick)) {
    throw Error('Idea with this nick already exists')
  }
  ideas.unshift(input)
  return true
})
