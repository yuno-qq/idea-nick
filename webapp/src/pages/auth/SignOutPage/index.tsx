import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSignInRoute } from '../../../lib/routes.ts'
import { trpc } from '../../../lib/trpc.tsx'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()

  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>Loading...</p>
}
