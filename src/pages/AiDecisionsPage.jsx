import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiMapPin, FiThermometer, FiPackage, FiUsers, FiMessageSquare } from 'react-icons/fi'
import { LuBrain } from 'react-icons/lu'

const AiDecisionsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('spoilage')
  const [selectedFood, setSelectedFood] = useState(null)
  const [selectedNgo, setSelectedNgo] = useState(null)
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  // Sample food items for spoilage prediction
  const foodItems = [
    {
      id: 1,
      name: 'Vegetable Biryani',
      type: 'Cooked Meal',
      quantity: '2.5 kg',
      cookingTime: '2023-09-15 14:30',
      storage: 'Room Temperature',
      temperature: '25°C',
      spoilageTime: '2023-09-15 20:30',
      hoursRemaining: 6,
      factors: [
        { name: 'Food Type', value: 'Cooked Rice Dish', impact: 'high' },
        { name: 'Storage Temperature', value: '25°C', impact: 'high' },
        { name: 'Time Since Cooking', value: '4 hours', impact: 'medium' },
        { name: 'Ingredients', value: 'Contains dairy', impact: 'high' },
      ],
    },
    {
      id: 2,
      name: 'Fresh Apples',
      type: 'Raw Fruit',
      quantity: '1.2 kg',
      cookingTime: '2023-09-14 10:00',
      storage: 'Refrigerated',
      temperature: '4°C',
      spoilageTime: '2023-09-21 10:00',
      hoursRemaining: 168,
      factors: [
        { name: 'Food Type', value: 'Fresh Fruit', impact: 'medium' },
        { name: 'Storage Temperature', value: '4°C', impact: 'high' },
        { name: 'Time Since Purchase', value: '1 day', impact: 'low' },
        { name: 'Condition', value: 'Intact skin', impact: 'high' },
      ],
    },
    {
      id: 3,
      name: 'Milk',
      type: 'Dairy',
      quantity: '1 liter',
      cookingTime: '2023-09-13 08:00',
      storage: 'Refrigerated',
      temperature: '4°C',
      spoilageTime: '2023-09-18 08:00',
      hoursRemaining: 120,
      factors: [
        { name: 'Food Type', value: 'Dairy', impact: 'high' },
        { name: 'Storage Temperature', value: '4°C', impact: 'high' },
        { name: 'Time Since Opening', value: '2 days', impact: 'medium' },
        { name: 'Packaging', value: 'Sealed', impact: 'medium' },
      ],
    },
  ]

  // Sample NGOs for matching
  const ngoList = [
    {
      id: 1,
      name: 'Food For All',
      distance: '1.2 km',
      availableUntil: '19:00',
      preferredFoods: ['Cooked Meals', 'Vegetables', 'Fruits'],
      minQuantity: '2 kg',
      matchScore: 92,
      matchFactors: [
        { name: 'Location Proximity', value: '1.2 km', impact: 'high' },
        { name: 'Time Availability', value: 'Available for 4 more hours', impact: 'high' },
        { name: 'Food Preference Match', value: 'Prefers cooked meals', impact: 'high' },
        { name: 'Quantity Requirements', value: 'Meets minimum quantity', impact: 'medium' },
      ],
    },
    {
      id: 2,
      name: 'Community Kitchen',
      distance: '3.5 km',
      availableUntil: '20:00',
      preferredFoods: ['Raw Ingredients', 'Vegetables', 'Grains'],
      minQuantity: '1 kg',
      matchScore: 78,
      matchFactors: [
        { name: 'Location Proximity', value: '3.5 km', impact: 'medium' },
        { name: 'Time Availability', value: 'Available for 5 more hours', impact: 'high' },
        { name: 'Food Preference Match', value: 'Prefers raw ingredients', impact: 'low' },
        { name: 'Quantity Requirements', value: 'Meets minimum quantity', impact: 'high' },
      ],
    },
    {
      id: 3,
      name: 'Shelter Meals',
      distance: '5.8 km',
      availableUntil: '21:00',
      preferredFoods: ['Cooked Meals', 'Bread', 'Dairy'],
      minQuantity: '3 kg',
      matchScore: 65,
      matchFactors: [
        { name: 'Location Proximity', value: '5.8 km', impact: 'low' },
        { name: 'Time Availability', value: 'Available for 6 more hours', impact: 'high' },
        { name: 'Food Preference Match', value: 'Prefers cooked meals', impact: 'high' },
        { name: 'Quantity Requirements', value: 'Below minimum quantity', impact: 'low' },
      ],
    },
  ]

  // Handle food item selection
  const handleFoodSelect = (food) => {
    setSelectedFood(food)
  }

  // Handle NGO selection
  const handleNgoSelect = (ngo) => {
    setSelectedNgo(ngo)
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Decision Insights</h1>
          <p className="text-xl text-gray-600">
            See how our AI predicts food spoilage and matches surplus food with NGOs
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('spoilage')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'spoilage' ? 'bg-secondary-100 text-secondary-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="flex items-center">
                <FiClock className="mr-2" /> Spoilage Prediction
              </span>
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'matching' ? 'bg-secondary-100 text-secondary-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="flex items-center">
                <FiUsers className="mr-2" /> NGO Matching
              </span>
            </button>
          </div>
        </div>

        {/* Spoilage Prediction Tab */}
        {activeTab === 'spoilage' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Food Items List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiPackage className="mr-2 text-secondary-500" /> Food Items
                  </h2>
                  <div className="space-y-4">
                    {foodItems.map((food) => (
                      <motion.div
                        key={food.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFoodSelect(food)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedFood?.id === food.id ? 'bg-secondary-50 border-2 border-secondary-200' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{food.name}</h3>
                            <p className="text-sm text-gray-600">{food.type} • {food.quantity}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${food.hoursRemaining < 12 ? 'bg-red-100 text-red-800' : food.hoursRemaining < 48 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {food.hoursRemaining < 24 ? `${food.hoursRemaining} hours left` : `${Math.floor(food.hoursRemaining / 24)} days left`}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Prediction Details */}
              <div className="lg:col-span-2">
                {selectedFood ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-card overflow-hidden"
                  >
                    <div className="bg-secondary-500 text-white p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedFood.name}</h2>
                          <p className="opacity-90">{selectedFood.type} • {selectedFood.quantity}</p>
                        </div>
                        <div className="bg-white text-secondary-700 rounded-full px-4 py-2 text-sm font-bold">
                          {selectedFood.hoursRemaining < 24 ? `${selectedFood.hoursRemaining} hours left` : `${Math.floor(selectedFood.hoursRemaining / 24)} days left`}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <FiThermometer className="mr-2 text-secondary-500" /> Storage Conditions
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Storage Method:</span>
                              <span className="font-medium">{selectedFood.storage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Temperature:</span>
                              <span className="font-medium">{selectedFood.temperature}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{selectedFood.type === 'Cooked Meal' ? 'Cooking Time:' : 'Purchase Time:'}</span>
                              <span className="font-medium">{new Date(selectedFood.cookingTime).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Predicted Spoilage:</span>
                              <span className="font-medium">{new Date(selectedFood.spoilageTime).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <LuBrain className="mr-2 text-secondary-500" /> AI Confidence
                          </h3>
                          <div className="h-32 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                  className="text-gray-200"
                                  strokeWidth="10"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                                <circle
                                  className="text-secondary-500"
                                  strokeWidth="10"
                                  strokeDasharray={251.2}
                                  strokeDashoffset={251.2 * (1 - 0.85)}
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                              </svg>
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-2xl font-bold">85%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">
                            AI prediction confidence based on historical data and food characteristics
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <LuBrain className="mr-2 text-secondary-500" /> Factors Influencing Prediction
                        </h3>
                        <div className="space-y-4">
                          {selectedFood.factors.map((factor, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{factor.name}</span>
                                <span className={`text-sm px-2 py-0.5 rounded-full ${factor.impact === 'high' ? 'bg-red-100 text-red-800' : factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">{factor.value}</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${factor.impact === 'high' ? 'bg-red-500' : factor.impact === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}
                                    style={{ width: factor.impact === 'high' ? '100%' : factor.impact === 'medium' ? '66%' : '33%' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-xl shadow-card p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiClock className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Select a Food Item</h3>
                    <p className="text-gray-600 text-center max-w-md">
                      Choose a food item from the list to see detailed AI spoilage predictions and analysis.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* NGO Matching Tab */}
        {activeTab === 'matching' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* NGO List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiUsers className="mr-2 text-secondary-500" /> Matched NGOs
                  </h2>
                  <div className="space-y-4">
                    {ngoList.map((ngo) => (
                      <motion.div
                        key={ngo.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNgoSelect(ngo)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedNgo?.id === ngo.id ? 'bg-secondary-50 border-2 border-secondary-200' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{ngo.name}</h3>
                            <p className="text-sm text-gray-600">{ngo.distance} • Available until {ngo.availableUntil}</p>
                          </div>
                          <div className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-medium">
                            {ngo.matchScore}% Match
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Matching Details */}
              <div className="lg:col-span-2">
                {selectedNgo ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-card overflow-hidden"
                  >
                    <div className="bg-secondary-500 text-white p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedNgo.name}</h2>
                          <p className="opacity-90">{selectedNgo.distance} • Available until {selectedNgo.availableUntil}</p>
                        </div>
                        <div className="bg-white text-secondary-700 rounded-full px-4 py-2 text-sm font-bold">
                          {selectedNgo.matchScore}% Match
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <FiMapPin className="mr-2 text-secondary-500" /> NGO Details
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Distance:</span>
                              <span className="font-medium">{selectedNgo.distance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Available Until:</span>
                              <span className="font-medium">{selectedNgo.availableUntil}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Minimum Quantity:</span>
                              <span className="font-medium">{selectedNgo.minQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Food Preferences:</span>
                              <span className="font-medium">{selectedNgo.preferredFoods.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <LuBrain className="mr-2 text-secondary-500" /> AI Match Score
                          </h3>
                          <div className="h-32 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                  className="text-gray-200"
                                  strokeWidth="10"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                                <circle
                                  className="text-secondary-500"
                                  strokeWidth="10"
                                  strokeDasharray={251.2}
                                  strokeDashoffset={251.2 * (1 - selectedNgo.matchScore / 100)}
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="40"
                                  cx="50"
                                  cy="50"
                                />
                              </svg>
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-2xl font-bold">{selectedNgo.matchScore}%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">
                            AI matching score based on location, time, and food preferences
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <LuBrain className="mr-2 text-secondary-500" /> Factors Influencing Match
                        </h3>
                        <div className="space-y-4">
                          {selectedNgo.matchFactors.map((factor, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{factor.name}</span>
                                <span className={`text-sm px-2 py-0.5 rounded-full ${factor.impact === 'high' ? 'bg-green-100 text-green-800' : factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">{factor.value}</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${factor.impact === 'high' ? 'bg-green-500' : factor.impact === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: factor.impact === 'high' ? '100%' : factor.impact === 'medium' ? '66%' : '33%' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Generated Message */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FiMessageSquare className="mr-2 text-secondary-500" /> AI-Generated Message
                        </h3>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                              <LuBrain className="text-secondary-600" />
                            </div>
                            <div>
                              <p className="text-gray-800">
                                Hi {selectedNgo.name}! We have 2.5kg of fresh Vegetable Biryani in excellent condition. 
                                It was prepared today at 2:30 PM and needs to be picked up before 8:30 PM. 
                                Our location is 1.2km from you. Would you be able to collect it? 
                                Please reply as soon as possible. Thank you for helping reduce food waste!
                              </p>
                              <div className="mt-4 flex space-x-2">
                                <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg text-sm font-medium hover:bg-secondary-600 transition-colors">
                                  Send Message
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                  Edit Message
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-xl shadow-card p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiUsers className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Select an NGO</h3>
                    <p className="text-gray-600 text-center max-w-md">
                      Choose an NGO from the list to see detailed AI matching analysis and generated messages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AiDecisionsPage