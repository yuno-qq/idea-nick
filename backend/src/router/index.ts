import { trpc } from '../lib/trpc'
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { signInTrpcRoute } from './signIn'
import { signUpTrcpRoute } from './signUp'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrcpRoute,
  signIn: signInTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
