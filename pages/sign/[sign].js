import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/header'
import SignMockup from '../../components/sign-mockup'
import Tab from '../../components/Tabs'
import SignStations from '../../components/SignStations'
import SignOptions from '../../components/SignOptions'
import StatusIndicator from '../../components/StatusIndicator'

export default function Home({ allStations, signOptions, sampleArrivals, signId, apiUrl }) {
  const [editStationsMode, setEditStationsMode] = useState(false);
  const [stations, setStations] = useState(allStations);
  const [arrivals, setArrivals] = useState(sampleArrivals);
  const [localOptions, setLocalOptions] = useState(signOptions);
  const [statusIcon, setStatusIcon] = useState('');
  
  useEffect(() => {
    console.log('updating sign');
    setStatusIcon('loading');
    const setOptionsUrl = `${apiUrl}/signinfo/${signId}?minArrivalTime=${localOptions.minimum_time}&warnTime=${localOptions.warn_time}&signDirection=${localOptions.direction || ''}&signRotation=${localOptions.rotating}&numArrivals=${localOptions.max_arrivals_to_show}&cycleTime=${localOptions.rotation_time}&autoOff=${localOptions.shutoff_schedule}&autoOffStart=${formatTime(localOptions.turnoff_time)}&autoOffEnd=${formatTime(localOptions.turnon_time)}`;
    fetch(setOptionsUrl, { method: 'POST' })
    .then(res => res.json())
    .then(() => {
        fetch(`${apiUrl}/sign/${signId}`)
        .then(res => res.json())
        .then(data => setArrivals([data[1], data[2]]))
        .then(() => {
          setTimeout(() => {
            setStatusIcon('success');
            setTimeout(() => {
              setStatusIcon('')
            }, 1500);
          }, 1000);
        });
    })
  }, [localOptions, stations]);


  function formatTime(time) {
      if (time.length != 8) {
          return time + ":00";
      }
      return time;
  }

  return (
    <main className={ styles.main }>
      <Head>
        <title>Subway Sign {signId}</title>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="white"/>
        <meta name="theme-color" content="#232338"/>
      </Head>
      <Header
        signId={ signId }
        signOnState={ signOptions.sign_on }
        editMode={ editStationsMode }
        apiUrl={ apiUrl }/>
      <SignMockup
        arrivals={ arrivals }
        localOptions={ localOptions }
        editMode={ editStationsMode }
        signId={ signId } />
      <Tab editMode={ editStationsMode }>
        <SignStations 
          stations={ stations }
          localOptions={ localOptions }
          setLocalOptions={ setLocalOptions }
          editMode={ editStationsMode }
          setEditMode={ setEditStationsMode }
          signId={ signId }
          apiUrl={ apiUrl }/>
        <SignOptions
          localOptions={ localOptions }
          setLocalOptions={ setLocalOptions }
          signId={ signId } />
      </Tab>
      <StatusIndicator state={statusIcon} />
    </main>
  )
}

export async function getServerSideProps({params}) {
  const signId = params.sign;
  const apiUrl = process.env.API_URL;
  const sampleArrivals = await fetch(`${apiUrl}/sign/${signId}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.length > 1) {
      return [data[1], data[2]];
    }
    return [null, null]
  });
  const signOptions = await fetch(`${apiUrl}/signinfo/${signId}`).then(data => data.json());
  const allStations = await fetch(`${apiUrl}/stations`)
  .then((res) => res.json());

  return { props: { allStations, signOptions, sampleArrivals, signId, apiUrl }}
}

export async function getServerSidePaths() {
  const apiUrl = process.env.API_URL;
  const signIds = await fetch(`${apiUrl}/signids`).then(data => data.json());
  const paths = signIds.map((item) => {
    return {
      params: {
        sign: item.sign_id
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
