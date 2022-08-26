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
  let [trackedStations, setTrackedStations] = useState([]);

  useEffect(() => {
    updateStations();
    console.log(signOptions);
  }, []);

  function updateStations() {
    const trackedStationsUrl = 'https://subway-arrivals-staging.herokuapp.com/signstations/kshf';

    fetch (trackedStationsUrl, {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      setTrackedStations(data);
    })
  }

  return (
    <main className={styles.main}>
      <Header signId="kshf" signOnState="false"/>
      <SignMockup sampleData={sampleArrivals} />
      <Tab>
        <SignStations trackedStations={ trackedStations } allStations={ allStations } setTrackedStations={ setTrackedStations } />
        <SignOptions signOptions={ signOptions } />
      </Tab>

    </main>
  )
}

export async function getStaticProps() {
  const allStations = await fetch('https://subway-arrivals-staging.herokuapp.com/stations').then((data) => data.json());
  const signOptions = await fetch('https://subway-arrivals-staging.herokuapp.com/signinfo/kshf').then((data) => data.json());
  const sampleArrivals = await fetch('https://subway-arrivals-staging.herokuapp.com/sign/kshf').then((data) => data.json());


  return { props: { allStations, signOptions, sampleArrivals }}
}
