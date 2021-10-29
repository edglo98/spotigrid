import { SessionContextProvider } from './contexts/SessionContext'
import AuthRouter from './router/AuthRouter'

function App () {
  return (
    <SessionContextProvider>
      <AuthRouter />
    </SessionContextProvider>
  )
}

export default App
