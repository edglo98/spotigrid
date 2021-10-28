import React from 'react'
import { images } from '../../assets/images'
import SpotifyLoginButton from '../../components/SpotifyLoginButton/SpotifyLoginButton'

const LoginPage = () => {
  return (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
        <img src={images.spotifyLogo} style={{ height: 90, width: 90 }} />
        <h1>Spotigrid</h1>
        <SpotifyLoginButton />
      </section>
    </div>
  )
}

export default LoginPage
