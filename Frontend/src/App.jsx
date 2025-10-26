
import React, { useContext, useEffect } from 'react'
import Login from '../src/Login/Login'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Registration from './Registration/Registration'
import Home from './Home/Home'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Context } from './main'

// backend url
export const backendServer = "https://securetodo.onrender.com";
// export const backendServer = "http://localhost:3000";

function App() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(Context)


  // const verifyUser = async () => {
  //   try {
  //     const response = await axios.get(`${backendServer}/verifyUser`, { withCredentials: true });
  //     if (response.data.success) {
  //       setIsAuthenticated(true);
  //       navigate('/');
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //   }
  // };

  // useEffect(() => {
  //   verifyUser();
  // }, []);






  console.log("from app.jsx isAuthenticated:  ", isAuthenticated)

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
