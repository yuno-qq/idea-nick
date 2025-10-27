import { pgr } from '../utils/pumpGetRoute'

export const getAllIdeasRoute = pgr(() => '/')
export const getViewIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}`)
export const getEditIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}/edit`)
export const getNewIdeaRoute = pgr(() => '/ideas/new')
export const getEditProfileRoute = pgr(() => '/edit-profile')
export const getSignUpRoute = pgr(() => '/sign-up')
export const getSignInRoute = pgr(() => '/sign-in')
export const getSignOutPage = pgr(() => '/sign-out')
