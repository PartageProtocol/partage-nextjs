import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import Auth from '@/modules/auth'
import AuthForm from 'components/auth/auth-form'

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <Auth /> 
}

export default AuthPage
