import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import SignMockup from '../components/sign-mockup'
import Tab from '../components/Tabs'
import SignStations from '../components/SignStations'
import SignOptions from '../components/SignOptions'
import StatusIndicator from '../components/StatusIndicator'
import { useDocumentMeta } from '../utils/useDocumentMeta'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function SignPage() {
  const { signId } = useParams()
  const [editStationsMode, setEditStationsMode] = useState(false)
  const [allStations, setAllStations] = useState([])
  const [arrivals, setArrivals] = useState([null, null])
  const [signOptions, setSignOptions] = useState({})
  const [statusIcon, setStatusIcon] = useState('')
  const [loading, setLoading] = useState(true)

  useDocumentMeta({
    title: `Subway Sign ${signId}`,
    description: 'Control your subway sign display',
    themeColor: '#232338'
  })

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [arrivalsData, signOptionsData, stationsData] = await Promise.all([
          fetch(`${API_URL}/sign/${signId}`).then(res => res.json()),
          fetch(`${API_URL}/signinfo/${signId}`).then(res => res.json()),
          fetch(`${API_URL}/stations`).then(res => res.json())
        ])

        setArrivals(arrivalsData.length > 1 ? [arrivalsData[1], arrivalsData[2]] : [null, null])
        setSignOptions(signOptionsData)
        setAllStations(stationsData)
      } catch (error) {
        console.error('Error fetching initial data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (signId) {
      fetchInitialData()
    }
  }, [signId])

  // Update sign when options change
  useEffect(() => {
    if (!signOptions || Object.keys(signOptions).length === 0 || loading) return

    console.log('updating sign')
    setStatusIcon('loading')
    const setOptionsUrl = `${API_URL}/signinfo/${signId}?minArrivalTime=${signOptions.minimum_time}&warnTime=${signOptions.warn_time}&signDirection=${signOptions.direction || ''}&signRotation=${signOptions.rotating}&numArrivals=${signOptions.max_arrivals_to_show}&cycleTime=${signOptions.rotation_time}&autoOff=${signOptions.shutoff_schedule}&autoOffStart=${formatTime(signOptions.turnoff_time)}&autoOffEnd=${formatTime(signOptions.turnon_time)}`
    
    fetch(setOptionsUrl, { method: 'POST' })
      .then((res) => res.json())
      .then(() => {
        fetch(`${API_URL}/sign/${signId}`)
          .then((res) => res.json())
          .then((data) => setArrivals([data[1], data[2]]))
          .then(() => {
            setTimeout(() => {
              setStatusIcon('success')
              setTimeout(() => {
                setStatusIcon('')
              }, 1500)
            }, 1000)
          })
      })
      .catch(error => {
        console.error('Error updating sign:', error)
        setStatusIcon('error')
        setTimeout(() => setStatusIcon(''), 1500)
      })
  }, [signOptions, allStations, signId, loading])

  function formatTime(time) {
    if (!time) return ''
    if (time.length !== 8) {
      return time + ':00'
    }
    return time
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <div>Loading...</div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Header
        signId={signId}
        signOnState={signOptions.sign_on}
        editMode={editStationsMode}
        apiUrl={API_URL}
      />
      <SignMockup
        arrivals={arrivals}
        localOptions={signOptions}
        editMode={editStationsMode}
        signId={signId}
      />
      <Tab editMode={editStationsMode}>
        <SignStations
          stations={allStations}
          localOptions={signOptions}
          setLocalOptions={setSignOptions}
          editMode={editStationsMode}
          setEditMode={setEditStationsMode}
          signId={signId}
          apiUrl={API_URL}
        />
        <SignOptions
          localOptions={signOptions}
          setLocalOptions={setSignOptions}
          signId={signId}
        />
      </Tab>
      <StatusIndicator state={statusIcon} />
    </main>
  )
}