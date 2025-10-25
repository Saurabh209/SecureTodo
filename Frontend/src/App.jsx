
import React from 'react'
import Login from '../src/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Registration from './Registration/Registration'
import Home from './Home/Home'
import { Toaster } from 'react-hot-toast'

export const backendServer = "https://securetodo.onrender.com";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      <Toaster />
    </>
  )
}
export default App
