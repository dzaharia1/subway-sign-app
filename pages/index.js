import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import SignMockup from '../components/sign-mockup'
import Tab from '../components/Tabs'
import SignStations from '../components/SignStations'
import SignOptions from '../components/SignOptions'

export default function Home({ allStations, signOptions, sampleArrivals }) {
  let [editStationsMode, setEditStationsMode] = useState(false);
  let [stations, setStations] = useState(allStations);

  return (
    <main className={styles.main}>
      <Header signId="kshf" signOnState="false" editMode={ editStationsMode }/>
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

export async function getStaticProps() {
  const sampleArrivals = await fetch('https://subway-arrivals-staging.herokuapp.com/sign/kshf').then((data) => data.json());
  const signOptions = await fetch('https://subway-arrivals-staging.herokuapp.com/signinfo/kshf').then(data => data.json());
  const allStations = await fetch('https://subway-arrivals-staging.herokuapp.com/stations')
  .then((res) => res.json())
  .then((data) => data.map(station => {
    station.tracked = signOptions.stations.indexOf(station.stopId) > -1;
    return station;
  }));
  
  return { props: { allStations, signOptions, sampleArrivals }}
}
