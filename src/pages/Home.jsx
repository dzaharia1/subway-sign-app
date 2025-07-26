import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Home.module.scss'
import TextInput from '../components/inputs/TextInput'
import Button from '../components/Button'
import { useDocumentMeta } from '../utils/useDocumentMeta'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Home() {
  const [signCodeInput, setSignCodeInput] = useState('')
  const [inputError, setInputError] = useState({ error: false })
  const [signIds, setSignIds] = useState([])
  const navigate = useNavigate()

  useDocumentMeta({
    title: 'Enter your sign code - Subway Sign',
    description: 'Access your subway sign with a 4-digit code',
    themeColor: '#232338'
  })

  useEffect(() => {
    // Fetch sign IDs when component mounts
    fetch(`${API_URL}/signids`)
      .then(res => res.json())
      .then(data => setSignIds(data.map(item => item.sign_id)))
      .catch(err => console.error('Error fetching sign IDs:', err))
  }, [])

  function signFieldInputHandler(e) {
    e.target.value = e.target.value.toLowerCase()
    let fieldValue = e.target.value
    setSignCodeInput(fieldValue)
    setInputError(fieldValidator(fieldValue))
    if (fieldValue.length === 4) {
      setInputError(checkForSign(fieldValue))
    }
  }

  function signFieldKeyPressHandler(e) {
    if (e.key === 'Enter' && !inputError.error) {
      submit()
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
    navigate(`/sign/${signCodeInput}`)
  }

  return (
    <main className={`${styles.main} ${styles['sign-selector']}`}>
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