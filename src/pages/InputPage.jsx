import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCamera, FiCheck, FiClock, FiThermometer, FiPackage, FiCalendar } from 'react-icons/fi'
import { LuBrain } from 'react-icons/lu'

const InputPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    foodType: '',
    foodName: '',
    quantity: '',
    quantityUnit: 'kg',
    cookingTime: '',
    storageCondition: '',
    temperature: '',
    description: '',
    photo: null
  })
  
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          foodType: '',
          foodName: '',
          quantity: '',
          quantityUnit: 'kg',
          cookingTime: '',
          storageCondition: '',
          temperature: '',
          description: '',
          photo: null
        })
        setPhotoPreview(null)
      }, 3000)
    }, 1500)
  }

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

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Log Surplus Food</h1>
          <p className="text-xl text-gray-600">
            Help reduce waste by logging your surplus food for redistribution or analysis.
          </p>
        </motion.div>

        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-primary-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-primary-600 mb-4">Food Logged Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your surplus food has been recorded. Our AI will analyze it and suggest the best redistribution options.
            </p>
            <motion.div 
              className="text-sm text-gray-500 animate-pulse"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Redirecting to dashboard...
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-card p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Type */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Food Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className={`block cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${formData.foodType === 'cooked' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input 
                        type="radio" 
                        name="foodType" 
                        value="cooked" 
                        className="sr-only" 
                        onChange={handleChange}
                        checked={formData.foodType === 'cooked'}
                      />
                      <FiPackage className="mx-auto mb-2 text-2xl" />
                      <span className="font-medium">Cooked Food</span>
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className={`block cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${formData.foodType === 'raw' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input 
                        type="radio" 
                        name="foodType" 
                        value="raw" 
                        className="sr-only" 
                        onChange={handleChange}
                        checked={formData.foodType === 'raw'}
                      />
                      <FiPackage className="mx-auto mb-2 text-2xl" />
                      <span className="font-medium">Raw Ingredients</span>
                    </label>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Food Name */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label htmlFor="foodName" className="block text-gray-700 font-medium mb-2">Food Name</label>
                <input
                  type="text"
                  id="foodName"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="E.g., Vegetable Biryani, Fresh Tomatoes"
                  className="input-field"
                  required
                />
              </motion.div>
              
              {/* Quantity */}
              <motion.div variants={itemVariants}>
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="flex">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="input-field rounded-r-none"
                    min="0.1"
                    step="0.1"
                    required
                  />
                  <select
                    name="quantityUnit"
                    value={formData.quantityUnit}
                    onChange={handleChange}
                    className="rounded-l-none rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lbs">lbs</option>
                    <option value="servings">servings</option>
                    <option value="pieces">pieces</option>
                  </select>
                </div>
              </motion.div>
              
              {/* Cooking/Purchase Time */}
              <motion.div variants={itemVariants}>
                <label htmlFor="cookingTime" className="block text-gray-700 font-medium mb-2">
                  {formData.foodType === 'cooked' ? 'Cooking Time' : 'Purchase Time'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    id="cookingTime"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </motion.div>
              
              {/* Storage Condition */}
              <motion.div variants={itemVariants}>
                <label htmlFor="storageCondition" className="block text-gray-700 font-medium mb-2">Storage Condition</label>
                <select
                  id="storageCondition"
                  name="storageCondition"
                  value={formData.storageCondition}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="" disabled>Select storage condition</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="frozen">Frozen</option>
                  <option value="roomTemperature">Room Temperature</option>
                  <option value="heated">Heated/Warm</option>
                </select>
              </motion.div>
              
              {/* Temperature (Optional) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="temperature" className="block text-gray-700 font-medium mb-2">
                  Temperature (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiThermometer className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="°C"
                    className="input-field pl-10"
                  />
                </div>
              </motion.div>
              
              {/* Description */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Any additional details about the food..."
                  rows="3"
                  className="input-field"
                ></textarea>
              </motion.div>
              
              {/* Photo Upload */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Photo (Optional)</label>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
                  <div className="space-y-2 text-center">
                    {photoPreview ? (
                      <div className="relative">
                        <img 
                          src={photoPreview} 
                          alt="Food preview" 
                          className="mx-auto h-48 w-auto rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null)
                            setFormData(prev => ({ ...prev, photo: null }))
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <FiCamera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-gray-600">
                          <label htmlFor="photo-upload" className="relative cursor-pointer text-primary-600 hover:text-primary-500 font-medium">
                            <span>Upload a photo</span>
                            <input 
                              id="photo-upload" 
                              name="photo" 
                              type="file" 
                              accept="image/*" 
                              className="sr-only" 
                              onChange={handlePhotoChange}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="mt-8"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Log Food'
                )}
              </motion.button>
            </motion.div>
            
            {/* AI Prediction Note */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 text-center text-sm text-gray-500"
            >
              <div className="flex items-center justify-center space-x-2">
                <LuBrain className="text-secondary-500" />
                <span>Our AI will analyze your food data to predict spoilage time and suggest redistribution options.</span>
              </div>
            </motion.div>
          </motion.form>
        )}
      </div>
    </div>
  )
}

export default InputPage