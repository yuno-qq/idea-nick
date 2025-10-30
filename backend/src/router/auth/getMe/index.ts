import { toClientMe } from '../../../lib/models'
import { trpcLoggedProcedure } from '../../../lib/trpc'

export const getMeTrpcRoute = trpcLoggedProcedure.query(async ({ ctx }) => {
  return { me: toClientMe(ctx.me) }
})
