import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import Header from '../../components/header';
import SignMockup from '../../components/sign-mockup';
import Tab from '../../components/Tabs';
import SignStations from '../../components/SignStations';
import SignOptions from '../../components/SignOptions';
import StatusIndicator from '../../components/StatusIndicator';

export default function Home({
  allAvailableStations,
  initialSignOptions,
  initialArrivals,
  signId,
  apiUrl,
}) {
  const [editStationsMode, setEditStationsMode] = useState(false);
  const [allStations, setAllStations] = useState(allAvailableStations);
  const [arrivals, setArrivals] = useState(initialArrivals);
  const [signOptions, setSignOptions] = useState(initialSignOptions);
  const [statusIcon, setStatusIcon] = useState('');

  useEffect(() => {
    console.log('updating sign');
    setStatusIcon('loading');
    const setOptionsUrl = `${apiUrl}/signinfo/${signId}?minArrivalTime=${signOptions.minimum_time}&warnTime=${signOptions.warn_time}&signDirection=${signOptions.direction || ''}&signRotation=${signOptions.rotating}&numArrivals=${signOptions.max_arrivals_to_show}&cycleTime=${signOptions.rotation_time}&autoOff=${signOptions.shutoff_schedule}&autoOffStart=${formatTime(signOptions.turnoff_time)}&autoOffEnd=${formatTime(signOptions.turnon_time)}`;
    fetch(setOptionsUrl, { method: 'POST' })
      .then((res) => res.json())
      .then(() => {
        fetch(`${apiUrl}/sign/${signId}`)
          .then((res) => res.json())
          .then((data) => setArrivals([data[1], data[2]]))
          .then(() => {
            setTimeout(() => {
              setStatusIcon('success');
              setTimeout(() => {
                setStatusIcon('');
              }, 1500);
            }, 1000);
          });
      });
  }, [signOptions, allStations]);

  function formatTime(time) {
    if (time.length !== 8) {
      return time + ':00';
    }
    return time;
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Subway Sign {signId}</title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="theme-color" content="#232338" />
      </Head>
      <Header
        signId={signId}
        signOnState={signOptions.sign_on}
        editMode={editStationsMode}
        apiUrl={apiUrl}
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
          apiUrl={apiUrl}
        />
        <SignOptions
          localOptions={signOptions}
          setLocalOptions={setSignOptions}
          signId={signId}
        />
      </Tab>
      <StatusIndicator state={statusIcon} />
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const signId = params.sign;
  const apiUrl = process.env.API_URL;
  const initialArrivals = await fetch(`${apiUrl}/sign/${signId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 1) {
        return [data[1], data[2]];
      }
      return [null, null];
    });
  const initialSignOptions = await fetch(`${apiUrl}/signinfo/${signId}`).then(
    (data) => data.json()
  );
  const allAvailableStations = await fetch(`${apiUrl}/stations`).then((res) =>
    res.json()
  );

  return {
    props: {
      allAvailableStations,
      initialSignOptions,
      initialArrivals,
      signId,
      apiUrl,
    },
  };
}

export async function getServerSidePaths() {
  const apiUrl = process.env.API_URL;
  const signIds = await fetch(`${apiUrl}/signids`).then((data) => data.json());
  const paths = signIds.map((item) => {
    return {
      params: {
        sign: item.sign_id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
