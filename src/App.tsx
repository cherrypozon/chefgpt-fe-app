'use client'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from "./page/Log-in/main"
import Main from "./page/Main/main"
import useSystemTheme from "./context/ThemeContext/themeContext"

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
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App