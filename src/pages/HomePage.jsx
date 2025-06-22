import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPieChart, FiClock, FiShare2, FiMessageSquare, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import { LuBrain } from 'react-icons/lu'

const HomePage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const features = [
    {
      icon: <FiPieChart className="text-primary-500" size={28} />,
      title: 'Food Surplus Logging',
      description: 'Easily log leftover food with our simple UI form. Track type, quantity, and storage conditions.'
    },
    {
      icon: <FiClock className="text-secondary-500" size={28} />,
      title: 'AI Spoilage Prediction',
      description: 'Our AI predicts how long food will remain safe based on type, preparation time, and storage method.'
    },
    {
      icon: <FiBarChart2 className="text-accent-500" size={28} />,
      title: 'Waste Analytics Dashboard',
      description: 'Track your waste patterns with ML-powered analytics showing most wasted items and trends over time.'
    },
    {
      icon: <FiShare2 className="text-primary-500" size={28} />,
      title: 'AI Redistribution Engine',
      description: 'Automatically match surplus food with local NGOs and food banks based on location and preferences.'
    },
    {
      icon: <FiMessageSquare className="text-secondary-500" size={28} />,
      title: 'LLM-Generated Messages',
      description: 'AI drafts polite messages to NGOs for food pickup, making communication seamless and efficient.'
    },
    {
      icon: <LuBrain className="text-accent-500" size={28} />,
      title: 'Personalized Waste Reduction Tips',
      description: 'Get AI-powered personalized tips based on your waste history to help reduce future waste.'
    }
  ]

  const stats = [
    { value: '85%', label: 'Waste Reduction' },
    { value: '250+', label: 'Active NGOs' },
    { value: '10K+', label: 'Meals Saved' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="hidden md:block absolute -bottom-10 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom relative z-10 py-10 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-50 border border-primary-100">
                <span className="text-primary-600 font-medium text-sm flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 pulse-dot"></span>
                  AI-Powered Food Management
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">WasteWise</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">Intelligent Food Waste Optimization</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Track surplus food, reduce waste, and intelligently redistribute leftovers with our cutting-edge AI technology for a more sustainable future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/input" className="btn-primary flex items-center justify-center gap-2 px-8 py-3 text-base shadow-lg shadow-primary-500/20">
                    Get Started <FiArrowRight />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/dashboard" className="btn-outline flex items-center justify-center gap-2 px-8 py-3 text-base">
                    View Dashboard
                  </Link>
                </motion.div>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative bg-white p-6 rounded-2xl shadow-card overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
                <img 
                  src="https://placehold.co/800x500/f0fdf4/166534?text=WasteWise+Dashboard&font=poppins" 
                  alt="WasteWise Dashboard Preview" 
                  className="rounded-lg w-full h-auto shadow-sm"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-card flex items-center gap-3 border border-gray-50"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiClock className="text-primary-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium">Food Saved</p>
                  <p className="text-xl font-bold text-primary-600">24.5 kg</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-card flex items-center gap-3 border border-gray-50"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiShare2 className="text-secondary-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium">NGOs Connected</p>
                  <p className="text-xl font-bold text-secondary-600">12</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-8 bg-white p-3 rounded-xl shadow-card border border-gray-50"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                    <FiCheckCircle className="text-accent-500" size={16} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">AI Optimized</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#f0fdf4_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        
        <div className="container-custom relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary-50 border border-secondary-100">
              <span className="text-secondary-600 font-medium text-sm">Cutting-Edge Features</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by AI, Driven by Purpose</h2>
            <p className="text-xl text-gray-600">
              Our platform combines cutting-edge AI technology with a mission to reduce food waste and help those in need.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card card-hover p-8 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-accent-50 border border-accent-100">
              <span className="text-accent-600 font-medium text-sm">Simple Process</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How WasteWise Works</h2>
            <p className="text-xl text-gray-600">
              Our intelligent platform makes it easy to track, analyze, and redistribute surplus food.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-24 relative">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-card max-w-lg border border-gray-100"
                  >
                    <img 
                      src="https://placehold.co/800x500/f0fdf4/166534?text=Log+Food&font=poppins" 
                      alt="Log Food" 
                      className="rounded-xl w-full h-auto"
                    />
                  </motion.div>
                </div>
                <div className="md:w-1/2 order-2 md:order-2 text-center md:text-left">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold absolute left-1/2 transform -translate-x-1/2 shadow-lg shadow-primary-500/20 z-10">
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Log Surplus Food</h3>
                  <p className="text-lg text-gray-600 max-w-md">
                    Use our simple form to log leftover food, including type, quantity, and storage conditions. 
                    Optional photo upload helps our AI better analyze your food.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2 order-1 md:order-2">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-card max-w-lg border border-gray-100"
                  >
                    <img 
                      src="https://placehold.co/800x500/f0f9ff/0c4a6e?text=AI+Prediction&font=poppins" 
                      alt="AI Prediction" 
                      className="rounded-xl w-full h-auto"
                    />
                  </motion.div>
                </div>
                <div className="md:w-1/2 order-2 md:order-1 text-center md:text-right">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 text-white font-bold absolute left-1/2 transform -translate-x-1/2 shadow-lg shadow-secondary-500/20 z-10">
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Analyzes & Predicts</h3>
                  <p className="text-lg text-gray-600 max-w-md ml-auto">
                    Our AI engine analyzes your food data to predict spoilage time and identifies patterns 
                    in your food waste to help you make better decisions.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-card max-w-lg border border-gray-100"
                  >
                    <img 
                      src="https://placehold.co/800x500/fff7ed/7c2d12?text=NGO+Matching&font=poppins" 
                      alt="NGO Matching" 
                      className="rounded-xl w-full h-auto"
                    />
                  </motion.div>
                </div>
                <div className="md:w-1/2 order-2 md:order-2 text-center md:text-left">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white font-bold absolute left-1/2 transform -translate-x-1/2 shadow-lg shadow-accent-500/20 z-10">
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Connect with NGOs</h3>
                  <p className="text-lg text-gray-600 max-w-md">
                    Our matching engine automatically connects your surplus food with nearby NGOs and food banks, 
                    generating polite messages to facilitate easy pickup and delivery.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-700"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1200x800/ffffff/ffffff?text=&font=poppins')] bg-cover bg-center"></div>
        
        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Reduce Food Waste?</h2>
            <p className="text-xl mb-10 text-white/90">
              Join WasteWise today and be part of the solution to global food waste. 
              Every meal saved counts!
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="/input" 
                className="bg-white text-primary-600 px-10 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
              >
                Get Started Now
              </Link>
            </motion.div>
            <div className="mt-8">
              <span className="text-white/70 text-sm">No credit card required • Free signup</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage