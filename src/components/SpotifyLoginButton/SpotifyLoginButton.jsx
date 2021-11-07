import { generateRandomString } from '../../helpers/generators'
import styles from './index.module.css'

const clientId = '75ea07921ce84791abfe00f71092f22f'
const redirectUri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/authredirect'
  : 'https://spotigrid.vercel.app/authredirect'
const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position'
const state = generateRandomString(16)

window.localStorage.setItem('state-track', state)

let url = 'https://accounts.spotify.com/authorize'
url += '?response_type=token'
url += '&client_id=' + encodeURIComponent(clientId)
url += '&scope=' + encodeURIComponent(scope)
url += '&redirect_uri=' + encodeURIComponent(redirectUri)
url += '&state=' + encodeURIComponent(state)

const SpotifyLoginButton = () => {
  const handleRedirectToLogin = () => {
    window.location = url
  }

  return (
    <button onClick={handleRedirectToLogin} className={styles.spotifyButton}>
      Login with Spotify
    </button>
  )
}

export default SpotifyLoginButton
