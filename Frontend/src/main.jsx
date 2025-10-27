import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'


export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  return (
    <Context.Provider value={{
      isAuthenticated, setIsAuthenticated, user, setUser, loading, setLoading
    }}>
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
)
