import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'

const RedirectedAuth = () => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    location.hash
      .replace('#', '')
      .split('&')
      .forEach(param => {
        const [key, value] = param.split('=')
        window.localStorage.setItem(key, value)
      })

    history.push('/')
  }, [location])

  return (
    <div>
      <h1>
        Cargando we....
      </h1>
    </div>
  )
}

export default RedirectedAuth
