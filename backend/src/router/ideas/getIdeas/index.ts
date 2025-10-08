import { trpc } from '../../../lib/trpc'
import { zGetIdeasTrpcInput } from './input'

export const getIdeasTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      nick: true,
      serialNumber: true,
    },
    orderBy: [{ createdAt: 'desc' }, { serialNumber: 'desc' }],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
  })

  const nextIdea = ideas.at(input.limit)
  const nextCursor = nextIdea?.serialNumber
  const ideasExceptNext = ideas.slice(0, input.limit)

  return { ideas: ideasExceptNext, nextCursor }
})
