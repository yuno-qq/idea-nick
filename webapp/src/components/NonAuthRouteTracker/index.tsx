import { atom } from 'nanostores'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAllIdeasRoute, getSignUpRoute, getSignInRoute, getSignOutPage } from '../../lib/routes.ts'

export const lastVisitedNotAuthRouteStore = atom<string>(getAllIdeasRoute())

export const NotAuthRouteTracker = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    const authRoutes = [getSignInRoute(), getSignUpRoute(), getSignOutPage()]
    const isAuthRoute = authRoutes.includes(pathname)
    if (!isAuthRoute) {
      lastVisitedNotAuthRouteStore.set(pathname)
    }
  }, [pathname])

  return null
}
