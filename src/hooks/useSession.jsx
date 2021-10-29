import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const useSession = () => {
  const { user, setUser } = useContext(SessionContext)

  const handleLogin = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
    setUser({ logedin: true, ...user })
  }

  return {
    user,
    actions: {
      handleLogin
    }
  }
}

export default useSession
