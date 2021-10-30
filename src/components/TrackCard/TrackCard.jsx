import { useRef, useState } from 'react'
import { MdPlayCircleOutline, MdPauseCircleOutline, MdOpenInNew } from 'react-icons/md'
import styles from './styles.module.css'

const TrackCard = ({ track, onPlay, onPause }) => {
  const [playing, setPlaying] = useState(false)
  const trackRef = useRef(null)

  const handlePlay = () => {
    if (track.preview_url) {
      if (onPlay) {
        onPlay(track.id, trackRef.current, setPlaying)
      }
      setPlaying(true)
      trackRef.current.play()
    }
  }

  const handlePause = () => {
    if (track.preview_url) {
      if (onPause) {
        onPause(track.id, trackRef.current, setPlaying)
      }
      setPlaying(false)
      trackRef.current.pause()
    }
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackName}>{track.name}</div>
      <div className={styles.trackArtist}>{track.artists[0].name}</div>

      <div className={styles.trackLink}>
        <a href={track.external_urls.spotify} target='_blank' rel='noreferrer'>
          <MdOpenInNew size={22} />
        </a>
      </div>
      {
        playing
          ? (
            <button onClick={handlePause}>
              <MdPauseCircleOutline size={22} />
            </button>
            )
          : (
            <button onClick={handlePlay}>
              <MdPlayCircleOutline size={22} />
            </button>
            )
      }
      <audio ref={trackRef} src={track.preview_url} />
    </div>
  )
}

export default TrackCard
