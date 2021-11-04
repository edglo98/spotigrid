import { createContext, useState } from 'react'

export const SessionContext = createContext(null)

export function SessionContextProvider ({ children }) {
  const localUser = window.localStorage.getItem('user')
    ? { logedin: true, ...JSON.parse(window.localStorage.getItem('user')) }
    : { logedin: false }

  const [user, setUser] = useState(localUser)

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  )
}
