import { decode } from 'js-base64'
import { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import BetterScroll from 'better-scroll'
import styles from './styles.module.css'
import TrackCard from '../../../components/TrackCard/TrackCard'

const SpotigridPage = () => {
  const { tracks } = useParams()
  const decoded = decode(tracks)
  const trackList = JSON.parse(decoded)
  const [audioPlay, setAudioPlay] = useState({})
  const mainRef = useRef(null)
  const songsRef = useRef([])
  let bscroll = null
  const maxElementsPerRow = 6

  const getCenter = (node) => {
    const x = node.offsetLeft + node.offsetWidth / 2
    const y = node.offsetTop + node.offsetHeight / 2
    return { x, y }
  }

  const isMobile = () => {
    const sizes = {
      mobile: 500,
      tablet: 1024
    }
    const query = `(max-width: ${sizes.mobile}px)`

    const media = window.matchMedia(query)
    return media.matches
  }
  const currentSize = isMobile() ? 160 : 220

  const handlePlayAudio = (trackId, htmlTrack, setPlaying) => {
    if (audioPlay.trackId === trackId) return
    if (audioPlay.trackId && audioPlay.trackId !== trackId) {
      audioPlay.htmlTrack.pause()
      audioPlay.setPlaying(false)
    }
    setAudioPlay({ trackId, htmlTrack, setPlaying })
  }

  useLayoutEffect(() => {
    bscroll = new BetterScroll(mainRef.current, {
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      probeType: 3
    })

    const $songs = songsRef.current

    console.log($songs[0].domElement)

    bscroll.scroller.scrollToElement(
      $songs[Math.floor($songs.length / 2) - 2].domElement,
      1000,
      currentSize / 2,
      currentSize / 2
    )

    const origin = getCenter(document.body)

    bscroll.on('scroll', (points) => {
      $songs.forEach(song => {
        song.changeDistance(origin)
      })
    })
  }, [trackList])

  return (
    <main className={styles.mainTracksContainer} ref={mainRef}>
      <aside
        className={styles.listOfTracks}
        style={{
          '--width': `${currentSize * maxElementsPerRow}px`,
          '--height': `${Math.ceil(trackList.length / maxElementsPerRow) * currentSize}px`,
          '--size': `${currentSize}px`,
          '--maxElementsPerRow': maxElementsPerRow
        }}
      >
        {
          trackList.map((track, i) => {
            return (
              <TrackCard
                ref={element => { songsRef.current[i] = element }}
                size={currentSize}
                key={track.id}
                track={track}
                onPressMedia={handlePlayAudio}
              />
            )
          })
        }
      </aside>
    </main>
  )
}

export default SpotigridPage
