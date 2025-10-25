
import React from 'react'
import Login from '../src/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Registration from './Registration/Registration'
import Home from './Home/Home'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path = '/home' element={<Home/>}/>
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}
export default App
