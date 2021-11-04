import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'
import LinkButton from '../LinkButton/LinkButton'
import styles from './styles.module.css'

const TrackCard = forwardRef(({ track, onPressMedia, size = null }, forwardRefElement) => {
  const [playing, setPlaying] = useState(false)
  const trackRef = useRef(null)
  const elementRef = useRef(null)
  const cantPlay = track.preview === null
  const [transform, setTranform] = useState({
    delta: 1,
    zindex: 100
  })

  const distanceBetweenPoints = (point1, point2) => {
    const x = Math.pow(point1.x - point2.x, 2)
    const y = Math.pow(point1.y - point2.y, 2)
    return Math.sqrt(x + y)
  }

  const changeDistance = (origin) => {
    const rect = elementRef.current.getBoundingClientRect()
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
    const calculatedDistance = distanceBetweenPoints(origin, coords)
    const delta = 2 - calculatedDistance / (rect.width * 1.35)
    const limitedDelta = Math.max(delta, 1)
    const zIndex = Math.ceil(limitedDelta * 100)
    return setTranform({ delta: limitedDelta, zindex: zIndex })
  }

  useImperativeHandle(forwardRefElement, () => ({
    changeDistance,
    domElement: elementRef.current
  }))

  const handlePlay = () => {
    if (track.preview) {
      if (onPressMedia) {
        onPressMedia(track.id, trackRef.current, setPlaying)
      }
      playing ? setPlaying(false) : setPlaying(true)
      playing ? trackRef.current.pause() : trackRef.current.play()
    }
  }

  return (
    <div
      style={{
        width: size ?? '100%',
        transition: 'transform 0.5s ease',
        transform: `scale3d(${transform.delta}, ${transform.delta}, ${transform.delta})`,
        zIndex: transform.zindex
      }}
      ref={elementRef}
      className={styles.trackContainer}
    >
      <span className={styles.coverImage} style={{ backgroundImage: `url(${track.image})` }} />
      <audio ref={trackRef} src={track.preview} />
      <div className={styles.infoContent}>
        <button disabled={cantPlay} className={`${styles.mediaButton} ${cantPlay ? styles.mediaButtonNoPrev : null}`} onClick={handlePlay}>
          {playing ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
        </button>
        <div className={styles.info}>
          <p className={styles.trackName}>{track.name}</p>
          <p className={styles.trackAlbum}>{track.artists[0]} &#8226; {track.album}</p>
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
})

export default TrackCard
