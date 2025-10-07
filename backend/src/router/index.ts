import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { getMeTrpcRoute } from './getMe'
import { signInTrpcRoute } from './signIn'
import { signUpTrcpRoute } from './signUp'
import { updateIdeaTrpcRoute } from './updateIdea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrcpRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
