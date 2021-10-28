import styles from './styles.module.css'
import { images } from '../../assets/images'
import { scrapingAlbums } from '../../assets/resources/scrapingAlbums'
import SpotifyLoginButton from '../../components/SpotifyLoginButton/SpotifyLoginButton'

const renderAlbums = scrapingAlbums.map(albumSrc => {
  const urlSplited = albumSrc.split('/')
  const idAlbum = urlSplited[urlSplited.length - 1]

  return (
    <span
      key={idAlbum}
      style={{ backgroundImage: `url(${albumSrc})` }}
      className={styles.albumImage}
    />
  )
})

const LoginPage = () => {
  return (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <section className={styles.bgLogin}>
        {renderAlbums}
      </section>
      <section className={styles.loginForm}>
        <img src={images.spotifyLogo} style={{ height: 90, width: 90 }} />
        <h1>Spotigrid</h1>
        <SpotifyLoginButton />
      </section>
    </div>
  )
}

export default LoginPage
