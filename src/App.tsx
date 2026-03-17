'use client'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from "./page/Log-in/main"
import Main from "./page/Main/main"
import useSystemTheme from "./context/ThemeContext/themeContext"
import { Provider as StoreProvider } from 'react-redux'
import { store } from './redux/store'

const AppRoutes = () => {
  useSystemTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/"     element={<Login />} />
      <Route path="/home" element={<Main onLogout={handleLogout} />} />
    </Routes>
  )
}

function App() {
  return (
    <StoreProvider store={store} >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App