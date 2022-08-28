import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TextInput from '../components/inputs/TextInput'
import Button from '../components/Button'

export default function Home({ signIds }) {
  let [signCodeInput, setSignCodeInput] = useState('');
  let [inputError, setInputError] = useState({ error: false });

  function signFieldInputHandler(e) {
    e.target.value = e.target.value.toLowerCase();
    let fieldValue = e.target.value;
    setSignCodeInput(fieldValue);
    setInputError(fieldValidator(fieldValue));
    if (fieldValue.length === 4) {
      setInputError(checkForSign(fieldValue));
    }
  }

  function signFieldKeyPressHandler(e) {
    if (e.key === 'Enter' && !inputError.error) {
      submit();
    }
  }

  function checkForSign(input) {
    if (signIds.indexOf(input) === -1) {
      return {
        error: true,
        errorText: 'Sign not found'
      }
    } else {
      return {
        error: false
      }
    }
  }

  function fieldValidator(input) {
    if (input.length != 4) {
        return {
            error: true,
            errorText: 'The sign code must be 4 characters long'
        }
    }

    if (!/^[a-zA-Z]+$/.test(input)) {
        return {
            error: true,
            errorText: 'The sign code must only contain letters'
        }
    }
    
    return {
        error: false,
        errorText: ''
    }
  }

  function submit() {
    window.location.href = `/sign/${signCodeInput}`
  }

  return (
    <main className={`${styles.main} ${styles['sign-selector']}`}>
      <Head>
        <title>Enter your sign code - Subway Sign</title>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="white"/>
        <meta name="theme-color" content="#232338"/>
      </Head>
      <h1>Access your sign</h1>
      <h2>Welcome to subway sign</h2>
      <TextInput
        id="sign_id"
        label="To get started, enter the 4-digit code on the back of your sign"
        type="text"
        value=""
        placeholder="e.g. abcd"
        error={inputError}
        inputHandler={signFieldInputHandler}
        keyPressHandler={signFieldKeyPressHandler} />
      <Button
        icon="/check.svg"
        label="Find my sign"
        className={styles.button}
        disabled={false}
        clickHandler={submit} />
    </main>
  )
}

export async function getServerSideProps() {
  const signIds = await fetch('https://subway-arrivals.herokuapp.com/signids')
  .then(res => res.json())
  .then(data => data.map(item => item.sign_id));

  return { props: { signIds }}
}
