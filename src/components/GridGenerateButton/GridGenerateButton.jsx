import { images } from '../../assets/images'
import styles from './styles.module.css'

const GridGenerateButton = ({ onClick, isLoading }) => {
  return (
    <button onClick={onClick} className={styles.gridGenerateButton}>
      <img className={isLoading ? styles.loading : null} src={images.spotifyLogo} alt='spotify logo' />
    </button>
  )
}

export default GridGenerateButton
