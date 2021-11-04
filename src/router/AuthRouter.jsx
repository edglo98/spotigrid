import React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RedirectedAuth from '../pages/auth/RedirectedAuth'
import SpotigridPage from '../pages/public/SpotigridPage/SpotigridPage'
import AppRouter from './AppRouter'

const AuthRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/myspotigrid/:tracks' component={SpotigridPage} />

          <Route path='/login' component={LoginPage} />
          <Route path='/authredirect' component={RedirectedAuth} />
          <Route path='/' component={AppRouter} />

          <Redirect to='/login' />
        </Switch>
      </div>
    </Router>
  )
}

export default AuthRouter
