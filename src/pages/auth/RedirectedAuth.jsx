import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import useSession from '../../hooks/useSession'

const RedirectedAuth = () => {
  const history = useHistory()
  const location = useLocation()
  const { actions } = useSession()

  useEffect(() => {
    const userData = {}
    location.hash
      .replace('#', '')
      .split('&')
      .forEach(param => {
        const [key, value] = param.split('=')
        userData[key] = value
      })

    if (!userData.access_token) {
      history.push('/login')
    }

    actions.handleLogin(userData)
    history.push('/')
  }, [location])

  return (
    <div />
  )
}

export default RedirectedAuth
