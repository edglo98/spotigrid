import { createContext, useState } from 'react'

export const SessionContext = createContext(null)

export function SessionContextProvider ({ children }) {
  const [user, setUser] = useState({ logedin: false })

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  )
}
