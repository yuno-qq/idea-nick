import { ideas } from '../../ideas'
import { trpc } from '../../trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  ideas.unshift(input)
  return true
})
