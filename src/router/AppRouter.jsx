import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from '../pages/app/HomePage'

const AppRouter = () => {
  return (
    <Switch>
      <Route path='/' component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default AppRouter
