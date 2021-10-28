import React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import AppRouter from './AppRouter'

const AuthRouter = () => {
  return (
    <Router>
      <div className='main-container'>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/' component={AppRouter} />

          <Redirect to='/login' />
        </Switch>
      </div>
    </Router>
  )
}

export default AuthRouter
