import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrcpRoute } from './auth/signUp'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { createIdeaTrpcRoute } from './ideas/createIdea'
import { getIdeaTrpcRoute } from './ideas/getIdea'
import { getIdeasTrpcRoute } from './ideas/getIdeas'
import { updateIdeaTrpcRoute } from './ideas/updateIdea'

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrcpRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
