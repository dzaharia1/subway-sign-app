import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignPage from './pages/SignPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign/:signId" element={<SignPage />} />
    </Routes>
  )
}

export default App