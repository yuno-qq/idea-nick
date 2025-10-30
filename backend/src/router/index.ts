import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { createTrpcRouter } from '../lib/trpc'
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrcpRoute } from './auth/signUp'
import { updatePasswordTrpcRoute } from './auth/updatePassword'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { blockIdeaTrpcRoute } from './ideas/blockIdea'
import { createIdeaTrpcRoute } from './ideas/createIdea'
import { getIdeaTrpcRoute } from './ideas/getIdea'
import { getIdeasTrpcRoute } from './ideas/getIdeas'
import { setIdeaLikeTrpcRoute } from './ideas/setIdeaLike'
import { updateIdeaTrpcRoute } from './ideas/updateIdea'

export const trpcRouter = createTrpcRouter({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  signUp: signUpTrcpRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
