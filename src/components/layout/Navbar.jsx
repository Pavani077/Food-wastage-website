import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiPlusCircle, FiPieChart, FiMessageSquare, FiSettings } from 'react-icons/fi'
import { LuBrain } from 'react-icons/lu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Log Food', path: '/input', icon: <FiPlusCircle /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FiPieChart /> },
    { name: 'AI Insights', path: '/ai-decisions', icon: <LuBrain /> },
    { name: 'Messages', path: '/messages', icon: <FiMessageSquare /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"
          >
            <span className="text-white font-bold text-xl">W</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-bold text-xl text-gradient">WasteWise</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1 transition-all ${location.pathname === link.path
                ? 'text-primary-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              <motion.span whileHover={{ scale: 1.1 }}>{link.icon}</motion.span>
              <span className="hidden md:block">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white shadow-lg w-full"
      >
        <div className="container-custom py-4 flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className={`p-3 rounded-lg flex items-center space-x-3 ${location.pathname === link.path 
                  ? 'bg-primary-50 text-primary-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsOpen(false)}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar