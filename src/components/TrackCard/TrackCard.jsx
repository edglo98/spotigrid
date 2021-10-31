import { useRef, useState } from 'react'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'
import LinkButton from '../LinkButton/LinkButton'
import styles from './styles.module.css'

const TrackCard = ({ track, onPressMedia }) => {
  const [playing, setPlaying] = useState(false)
  const trackRef = useRef(null)
  const cantPlay = track.preview_url === null

  const handlePlay = () => {
    if (track.preview_url) {
      if (onPressMedia) {
        onPressMedia(track.id, trackRef.current, setPlaying)
      }
      playing ? setPlaying(false) : setPlaying(true)
      playing ? trackRef.current.pause() : trackRef.current.play()
    }
  }

  return (
    <div className={styles.trackContainer}>
      <span className={styles.coverImage} style={{ backgroundImage: `url(${track.album.images[1].url})` }} />
      <audio ref={trackRef} src={track.preview_url} />
      <div className={styles.infoContent}>
        <button disabled={cantPlay} className={`${styles.mediaButton} ${cantPlay ? styles.mediaButtonNoPrev : null}`} onClick={handlePlay}>
          {playing ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
        </button>
        <div className={styles.info}>
          <p className={styles.trackName}>{track.name}</p>
          <p className={styles.trackAlbum}>{track.artists[0].name} &#8226; {track.album.name}</p>
        </div>
        <LinkButton
          iconSize={18}
          target='_blank'
          label={<p>View in spotify</p>}
          to='/grid' // params
        />
      </div>
    </div>
  )
}

export default TrackCard
