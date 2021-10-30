import { useState } from 'react'
import useSession from '../../hooks/useSession'
import GridGenerateButton from '../../components/GridGenerateButton/GridGenerateButton'
import axios from 'axios'
import { MdOutlineContentCopy, MdOpenInNew } from 'react-icons/md'
import RadioButton from '../../components/RadioButton/RadioButton'
import LinkButton from '../../components/LinkButton/LinkButton'
import Button from '../../components/Button/Button'

const HomePage = () => {
  const { user } = useSession()
  const [load, setLoad] = useState(false)
  const [tracks, setTracks] = useState([])
  const [params, setParams] = useState({
    typeSearch: 'tracks',
    time_range: 'long_term'
  })

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

  console.log(tracks)

  return (
    <div style={{ margin: '.5px auto', padding: '0px 1rem', flex: 1, maxWidth: 950 }}>
      <h1 style={{ textAlign: 'center', margin: '50px 0px 35px 0px' }}>Spotigrid</h1>
      <h4 style={{ textAlign: 'center', margin: '50px 0px 35px 0px' }}>Press the logo for generate your own grid layout with your top music list</h4>

      <section style={{ display: 'grid', placeItems: 'center', margin: '2rem 0' }}>
        <GridGenerateButton
          onClick={handleGetGridInfo}
          isLoading={load}
        />
      </section>

      <h4 style={{ textAlign: 'center', margin: '50px 0px 35px 0px' }}>Generate Spotigrid</h4>
      <section style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <div style={{ minWidth: 250 }}>
          <h5>Generate from my top <b>{params.typeSearch}</b></h5>
          <RadioButton
            onChange={handleChangeTypeSearch}
            checked={params.typeSearch === 'tracks'}
            name='tracks'
            label='Tracks'
          />
          <RadioButton
            onChange={handleChangeTypeSearch}
            checked={params.typeSearch === 'artists'}
            name='artists'
            label='Artists'
          />
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

      <h4 style={{ textAlign: 'center', margin: '50px 0px 35px 0px' }}>Your grid top tracks</h4>
      <section style={{ display: 'flex', justifyContent: 'space-around', gap: '2rem' }}>
        <LinkButton
          icon={<MdOpenInNew size={22} />}
          label='Watch your grid here'
          to='/grid'
        />
        <Button
          leftIcon={<MdOutlineContentCopy size={22} />}
          label='Copy link to share'
          onClick={() => {}}
        />
      </section>

      <h4 style={{ textAlign: 'center', margin: '50px 0px 35px 0px' }}>Your list of tracks</h4>
      <section>
        <div>
          lista
        </div>
      </section>
    </div>
  )
}

export default HomePage
