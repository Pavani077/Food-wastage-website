import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiSettings, FiMapPin, FiClock, FiSliders, FiToggleRight, FiBell, FiShield, FiSave } from 'react-icons/fi'

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, Country',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    preferences: {
      autoMatch: true,
      maxDistance: 10,
      minQuantity: 1,
      foodTypes: ['cooked', 'raw', 'packaged'],
    },
  })
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle nested object changes (notifications, preferences)
  const handleNestedChange = (category, name, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value
      }
    }))
  }

  // Handle checkbox changes for food types
  const handleFoodTypeChange = (type) => {
    const currentTypes = [...formData.preferences.foodTypes]
    if (currentTypes.includes(type)) {
      // Remove type if already selected
      const updatedTypes = currentTypes.filter(t => t !== type)
      handleNestedChange('preferences', 'foodTypes', updatedTypes)
    } else {
      // Add type if not selected
      handleNestedChange('preferences', 'foodTypes', [...currentTypes, type])
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        mass: 0.8,
        damping: 15
      }
    }
  }
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    tap: { 
      scale: 0.95 
    }
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 w-20 h-20 border-4 border-secondary-200 border-b-secondary-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            <div className="absolute top-4 left-4 w-16 h-16 border-4 border-accent-200 border-l-accent-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-6 text-xl font-medium text-gradient animate-pulse">Loading settings...</p>
          <p className="mt-2 text-gray-500">Please wait while we prepare your preferences</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-primary-50 border border-primary-100">
            <span className="text-primary-600 font-medium text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 pulse-dot"></span>
              Customize Your Experience
            </span>
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500">Settings</h1>
          <p className="text-xl text-gray-600">
            Manage your account, preferences, and NGO connections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
              <nav className="flex flex-col">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center space-x-3 px-6 py-5 text-left transition-colors ${activeTab === 'account' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}`}
                >
                  <FiUser className={`${activeTab === 'account' ? 'text-primary-500' : 'text-gray-500'} text-lg`} />
                  <span>Account Settings</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab('preferences')}
                  className={`flex items-center space-x-3 px-6 py-5 text-left transition-colors ${activeTab === 'preferences' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}`}
                >
                  <FiSliders className={`${activeTab === 'preferences' ? 'text-primary-500' : 'text-gray-500'} text-lg`} />
                  <span>Food Preferences</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center space-x-3 px-6 py-5 text-left transition-colors ${activeTab === 'notifications' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}`}
                >
                  <FiBell className={`${activeTab === 'notifications' ? 'text-primary-500' : 'text-gray-500'} text-lg`} />
                  <span>Notifications</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab('privacy')}
                  className={`flex items-center space-x-3 px-6 py-5 text-left transition-colors ${activeTab === 'privacy' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700 font-medium' : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}`}
                >
                  <FiShield className={`${activeTab === 'privacy' ? 'text-primary-500' : 'text-gray-500'} text-lg`} />
                  <span>Privacy & Data</span>
                </motion.button>
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-card p-8 border border-gray-100">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-3 rounded-xl mr-4">
                        <FiUser className="text-primary-600 text-xl" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                        Account Settings
                      </h2>
                    </div>
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-sm"
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FiSettings className="text-primary-600" size={20} />
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <FiMapPin className="text-gray-400" />
                        </div>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        ></textarea>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants} 
                      className="pt-6"
                    >
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      >
                        <FiSave className="mr-2" /> Save Changes
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Food Preferences */}
              {activeTab === 'preferences' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-secondary-100 p-3 rounded-xl mr-4">
                        <FiSliders className="text-secondary-600 text-xl" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-secondary-500">
                        Food Preferences
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-primary-50 to-white px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-primary-800">Automatic Matching</h3>
                      </div>
                      <div className="flex items-center justify-between p-6">
                        <div>
                          <p className="font-medium text-gray-800">Enable AI-powered automatic matching</p>
                          <p className="text-sm text-gray-600 mt-1">Allow our AI to automatically match your surplus food with nearby NGOs</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            id="autoMatch"
                            checked={formData.preferences.autoMatch}
                            onChange={() => handleNestedChange('preferences', 'autoMatch', !formData.preferences.autoMatch)}
                            className="sr-only peer"
                          />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:shadow-md after:transition-all peer-checked:bg-primary-500"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-primary-50 to-white px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-primary-800">Distance Preferences</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <label htmlFor="maxDistance" className="block text-gray-700 font-medium">Maximum distance for NGO matching (km)</label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            id="maxDistance"
                            min="1"
                            max="50"
                            value={formData.preferences.maxDistance}
                            onChange={(e) => handleNestedChange('preferences', 'maxDistance', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                          <motion.span 
                            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-medium min-w-[80px] text-center shadow-sm"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.05, 1], transition: { duration: 0.5, times: [0, 0.5, 1] } }}
                            key={formData.preferences.maxDistance}
                          >
                            {formData.preferences.maxDistance} km
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-primary-50 to-white px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-primary-800">Minimum Quantity</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <label htmlFor="minQuantity" className="block text-gray-700 font-medium">Minimum food quantity for donation (kg)</label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            id="minQuantity"
                            min="0.5"
                            max="10"
                            step="0.5"
                            value={formData.preferences.minQuantity}
                            onChange={(e) => handleNestedChange('preferences', 'minQuantity', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                          <motion.span 
                            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-medium min-w-[80px] text-center shadow-sm"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.05, 1], transition: { duration: 0.5, times: [0, 0.5, 1] } }}
                            key={formData.preferences.minQuantity}
                          >
                            {formData.preferences.minQuantity} kg
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-primary-50 to-white px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-primary-800">Food Type Preferences</h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.div 
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <input
                              type="checkbox"
                              id="foodTypeCooked"
                              checked={formData.preferences.foodTypes.includes('cooked')}
                              onChange={() => handleFoodTypeChange('cooked')}
                              className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="foodTypeCooked" className="ml-3 text-gray-700 font-medium">Cooked Meals</label>
                          </motion.div>
                          <motion.div 
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <input
                              type="checkbox"
                              id="foodTypeRaw"
                              checked={formData.preferences.foodTypes.includes('raw')}
                              onChange={() => handleFoodTypeChange('raw')}
                              className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="foodTypeRaw" className="ml-3 text-gray-700 font-medium">Raw Ingredients</label>
                          </motion.div>
                          <motion.div 
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <input
                              type="checkbox"
                              id="foodTypePackaged"
                              checked={formData.preferences.foodTypes.includes('packaged')}
                              onChange={() => handleFoodTypeChange('packaged')}
                              className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="foodTypePackaged" className="ml-3 text-gray-700 font-medium">Packaged Food</label>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-6">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      >
                        <FiSave className="mr-2" /> Save Preferences
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                      <FiBell className="mr-2 text-primary-500" /> Notification Settings
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates and alerts via email</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            id="notifyEmail"
                            checked={formData.notifications.email}
                            onChange={() => handleNestedChange('notifications', 'email', !formData.notifications.email)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates and alerts via text message</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            id="notifySms"
                            checked={formData.notifications.sms}
                            onChange={() => handleNestedChange('notifications', 'sms', !formData.notifications.sms)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates and alerts via push notifications</p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            id="notifyPush"
                            checked={formData.notifications.push}
                            onChange={() => handleNestedChange('notifications', 'push', !formData.notifications.push)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="btn-primary flex items-center justify-center"
                      >
                        <FiSave className="mr-2" /> Save Notification Settings
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Privacy & Data */}
              {activeTab === 'privacy' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                      <FiShield className="mr-2 text-primary-500" /> Privacy & Data
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Data Usage</h3>
                        <p className="text-gray-600 mb-4">
                          We use your data to improve our AI models and provide better food waste reduction recommendations. 
                          Your personal information is never shared with third parties without your consent.
                        </p>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dataUsage"
                            checked={true}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <label htmlFor="dataUsage" className="ml-2 text-gray-700">
                            I agree to allow WasteWise to use my anonymized data for improving AI models
                          </label>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Location Services</h3>
                        <p className="text-gray-600 mb-4">
                          We use your location to find nearby NGOs and optimize food redistribution. 
                          You can disable location services at any time, but this may limit matching capabilities.
                        </p>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="locationServices"
                            checked={true}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <label htmlFor="locationServices" className="ml-2 text-gray-700">
                            Enable location services for better NGO matching
                          </label>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Account Data</h3>
                        <p className="text-gray-600 mb-4">
                          You can download all your data or request account deletion at any time.
                        </p>
                        <div className="flex space-x-4">
                          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                            Download My Data
                          </button>
                          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="btn-primary flex items-center justify-center"
                      >
                        <FiSave className="mr-2" /> Save Privacy Settings
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage