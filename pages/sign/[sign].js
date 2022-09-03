import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Header from '../../components/header'
import SignMockup from '../../components/sign-mockup'
import Tab from '../../components/Tabs'
import SignStations from '../../components/SignStations'
import SignOptions from '../../components/SignOptions'

export default function Home({ allStations, signOptions, sampleArrivals, signId }) {
  const [editStationsMode, setEditStationsMode] = useState(false);
  const [stations, setStations] = useState(allStations);
  const [arrivals, setArrivals] = useState(sampleArrivals);
  const [localOptions, setLocalOptions] = useState(signOptions);

  useEffect(() => {
    console.log('updating sign');
    const setOptionsUrl = `https://subway-arrivals.herokuapp.com/signinfo/${signId}?minArrivalTime=${localOptions.minimum_time}&warnTime=${localOptions.warn_time}&signDirection=${localOptions.direction || ''}&signRotation=${localOptions.rotating}&numArrivals=${localOptions.max_arrivals_to_show}&cycleTime=${localOptions.rotation_time}&autoOff=${localOptions.shutoff_schedule}&autoOffStart=${formatTime(localOptions.turnoff_time)}&autoOffEnd=${formatTime(localOptions.turnon_time)}`;
    fetch(setOptionsUrl, { method: 'POST' })
    .then(res => res.json())
    .then(() => {
        fetch(`https://subway-arrivals.herokuapp.com/sign/${signId}`)
        .then(res => res.json())
        .then(data => setArrivals([data[1], data[2]]));
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
        editMode={ editStationsMode }/>
      <SignMockup
        arrivals={ arrivals }
        localOptions={ localOptions }
        editMode={ editStationsMode }
        signId={ signId } />
      <Tab editMode={ editStationsMode }>
        <SignStations 
          stations={ stations }
          setStations={ setStations }
          editMode={ editStationsMode }
          setEditMode={ setEditStationsMode }
          signId={ signId }/>
        <SignOptions
          localOptions={ localOptions }
          setLocalOptions={ setLocalOptions }
          signId={ signId } />
      </Tab>

    </main>
  )
}

export async function getServerSideProps({params}) {
    const signId = params.sign;
    const sampleArrivals = await fetch(`https://subway-arrivals.herokuapp.com/sign/${signId}`)
    .then((res) => res.json())
    .then((data) => [data[1], data[2]]);
    const signOptions = await fetch(`https://subway-arrivals.herokuapp.com/signinfo/${signId}`).then(data => data.json());
    const allStations = await fetch(`https://subway-arrivals.herokuapp.com/stations`)
    .then((res) => res.json())
    .then((data) => data.map(station => {
      station.tracked = signOptions.stations.indexOf(station.stopId) > -1;
      return station;
    }));

    return { props: { allStations, signOptions, sampleArrivals, signId }}
}

export async function getServerSidePaths() {
  const signIds = await fetch('https://subway-arrivals.herokuapp.com/signids').then(data => data.json());
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
