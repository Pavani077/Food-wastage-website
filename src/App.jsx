import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import HomePage from './pages/HomePage'
import InputPage from './pages/InputPage'
import DashboardPage from './pages/DashboardPage'
import AiDecisionsPage from './pages/AiDecisionsPage'
import MessagesPage from './pages/MessagesPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gradient">WasteWise</h2>
          <p className="mt-2 text-gray-600 animate-pulse">Loading amazing features...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ai-decisions" element={<AiDecisionsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App