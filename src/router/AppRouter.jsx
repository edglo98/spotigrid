import { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import HomePage from '../pages/app/HomePage/HomePage'
import useSession from '../hooks/useSession'
import Navbar from '../components/Navbar/Navbar'
import SpotigridPage from '../pages/app/SpotigridPage/SpotigridPage'

const AppRouter = () => {
  const history = useHistory()
  const { user } = useSession()

  useEffect(() => {
    if (!user.logedin) {
      history.push('/login')
    }
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <Switch>
        <Route path='/myspotigrid/:tracks' component={SpotigridPage} />
        <Route exact path='/' component={HomePage} />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default AppRouter
