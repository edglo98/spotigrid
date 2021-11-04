import { useState } from 'react'
import axios from 'axios'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './styles.module.css'
import useSession from '../../../hooks/useSession'
import GridGenerateButton from '../../../components/GridGenerateButton/GridGenerateButton'
import RadioButton from '../../../components/RadioButton/RadioButton'
import LinkButton from '../../../components/LinkButton/LinkButton'
import Button from '../../../components/Button/Button'
import TrackCard from '../../../components/TrackCard/TrackCard'

const HomePage = () => {
  const { user } = useSession()
  const [load, setLoad] = useState(false)
  const [tracks, setTracks] = useState([])
  const [params, setParams] = useState({
    typeSearch: 'tracks',
    time_range: 'long_term'
  })
  const [audioPlay, setAudioPlay] = useState({})

  const handlePlayAudio = (trackId, htmlTrack, setPlaying) => {
    if (audioPlay.trackId === trackId) return
    if (audioPlay.trackId && audioPlay.trackId !== trackId) {
      audioPlay.htmlTrack.pause()
      audioPlay.setPlaying(false)
    }
    setAudioPlay({ trackId, htmlTrack, setPlaying })
  }

  const handleChangeTypeSearch = (e) => {
    setParams({
      ...params,
      typeSearch: e.target.id
    })
  }

  const handleChangeTimeRange = (e) => {
    setParams({
      ...params,
      time_range: e.target.id
    })
  }

  const handleGetGridInfo = async () => {
    try {
      setLoad(true)
      const { data } = await axios.get(`https://api.spotify.com/v1/me/top/${params.typeSearch}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        },
        params: {
          time_range: params.time_range,
          limit: 40
        }
      })

      setTracks(data.items)
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
    }
  }

  return (
    <div style={{ margin: '2rem auto', padding: '0px 1rem', flex: 1, maxWidth: 950 }}>
      <h1 className={styles.centerTitle}>Spotigrid</h1>
      <h4 className={styles.centerTitle}>Press the logo for generate your own grid layout with your top music list</h4>

      <section style={{ display: 'grid', placeItems: 'center', margin: '2rem 0' }}>
        <GridGenerateButton
          onClick={handleGetGridInfo}
          isLoading={load}
        />
      </section>

      <h4 className={styles.centerTitle}>Generate Spotigrid from</h4>
      <section style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <div style={{ minWidth: 250 }}>
          <h5>Generate from my top <b>{params.typeSearch}</b></h5>
          <RadioButton
            onChange={handleChangeTypeSearch}
            checked={params.typeSearch === 'tracks'}
            name='tracks'
            label='Tracks'
          />
          {/* <RadioButton
            onChange={handleChangeTypeSearch}
            checked={params.typeSearch === 'artists'}
            name='artists'
            label='Artists'
          /> */}
        </div>

        <div style={{ minWidth: 250 }}>
          <h5>Search from <b>{params.time_range.replace('_', ' ')}</b></h5>
          <RadioButton
            onChange={handleChangeTimeRange}
            checked={params.time_range === 'long_term'}
            name='long_term'
            label='Long term'
          />
          <RadioButton
            onChange={handleChangeTimeRange}
            checked={params.time_range === 'medium_term'}
            name='medium_term'
            label='Medium term'
          />
          <RadioButton
            onChange={handleChangeTimeRange}
            checked={params.time_range === 'short_term'}
            name='short_term'
            label='Short term'
          />
        </div>
      </section>

      <h4 className={styles.centerTitle}>Your Spotigrid top tracks here</h4>
      <section style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <LinkButton
          disabled={tracks.length === 0}
          target='_blank'
          label={<h5>Watch your grid here</h5>}
          to='/myspotigrid' // params
        />
        <Button
          disabled={tracks.length === 0}
          leftIcon={<MdOutlineContentCopy size={22} />}
          label='Copy link to share'
          onClick={() => {}}
        />
      </section>

      <h4 className={styles.centerTitle}>The list of tracks</h4>
      {
        tracks.length === 0
          ? <h5 className={styles.secondaryText}>You haven't yet generated your track list 🥲</h5>
          : <h5 className={styles.secondaryText}>Remember, to see your Spotigrid you have to go to the link above 👆🏼</h5>
      }
      <section className={styles.listOfTracks}>
        {
          tracks.map(track => <TrackCard key={track.id} track={track} onPressMedia={handlePlayAudio} />)
        }
      </section>
    </div>
  )
}

export default HomePage
