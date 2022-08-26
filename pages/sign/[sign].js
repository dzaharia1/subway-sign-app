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
  let [editStationsMode, setEditStationsMode] = useState(false);
  let [stations, setStations] = useState(allStations);

  return (
    <main className={styles.main}>
      <Header signId={signId} signOnState={signOptions.sign_on} editMode={ editStationsMode }/>
      <SignMockup sampleData={sampleArrivals} signOptions={signOptions} editMode={ editStationsMode } />
      <Tab editMode={ editStationsMode }>
        <SignStations 
          stations={ stations }
          setStations={setStations}
          editMode={editStationsMode}
          setEditMode={setEditStationsMode}/>
        <SignOptions signOptions={ signOptions } />
      </Tab>

    </main>
  )
}

export async function getStaticProps({params}) {
    const signId = params.sign;
    const sampleArrivals = await fetch(`https://subway-arrivals-staging.herokuapp.com/sign/${signId}`).then((data) => data.json());
    const signOptions = await fetch(`https://subway-arrivals-staging.herokuapp.com/signinfo/${signId}`).then(data => data.json());
    const allStations = await fetch(`https://subway-arrivals-staging.herokuapp.com/stations`)
    .then((res) => res.json())
    .then((data) => data.map(station => {
      station.tracked = signOptions.stations.indexOf(station.stopId) > -1;
      return station;
    }));

    return { props: { allStations, signOptions, sampleArrivals, signId }}
}

export async function getStaticPaths() {
  const signIds = await fetch('https://subway-arrivals-staging.herokuapp.com/signids').then(data => data.json());
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
