import { trpc } from '../../../lib/trpc'

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      nick: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { ideas }
})
