
import React, { useContext, useEffect } from 'react'
import Login from '../src/Login/Login'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Registration from './Registration/Registration'
import Home from './Home/Home'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Context } from './main'
import CurrentStatusDevOnly from './CurrentStatusDevOnly'

// backend url
export const backendServer = "https://securetodo.onrender.com";
// export const backendServer = "http://localhost:3000";

function App() {
  const navigate = useNavigate();

  const {
    isAuthenticated, setIsAuthenticated,
    user, setUser,
    loading, setLoading } = useContext(Context)


  useEffect(() => {
    setLoading(true)
    axios.get(`${backendServer}/profile`, { withCredentials: true, })
      .then(res => {
        setUser(res.data.userProfile);
        setIsAuthenticated(true)
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => { setLoading(false) })
  }, [])



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
