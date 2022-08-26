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
  let [arrivals, setArrivals] = useState(sampleArrivals);
  let [localOptions, setLocalOptions] = useState(signOptions);

  useEffect(() => {
      fetch(`https://subway-arrivals-staging.herokuapp.com/sign/${signId}`)
      .then(res => res.json())
      .then((data) => {
          console.log('updating');
          setArrivals([data[1], data[2]]);
      });
      console.log(arrivals);
  }, [localOptions]);

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
        signOptions={ localOptions }
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
          signOptions={ localOptions }
          setSignOptions={ setLocalOptions }
          signId={ signId }/>
      </Tab>

    </main>
  )
}

export async function getStaticProps({params}) {
    const signId = params.sign;
    const sampleArrivals = await fetch(`https://subway-arrivals-staging.herokuapp.com/sign/${signId}`)
    .then((res) => res.json())
    .then((data) => [data[1], data[2]]);
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
