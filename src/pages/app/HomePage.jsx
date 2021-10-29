import React from 'react'
import useSession from '../../hooks/useSession'

const HomePage = () => {
  const { user } = useSession()
  console.log(user)

  return (
    <div style={{ margin: '.5px 1rem' }}>
      <h1>Home Page</h1>
    </div>
  )
}

export default HomePage
