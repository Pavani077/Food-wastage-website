import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingDown, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiPieChart, FiBarChart2, FiCalendar } from 'react-icons/fi'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js'
import { Pie, Line, Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title)

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('week')
  const [isLoading, setIsLoading] = useState(true)
  
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

  // Mock data for charts
  const wasteByTypeData = {
    labels: ['Bread', 'Vegetables', 'Fruits', 'Dairy', 'Cooked Meals', 'Other'],
    datasets: [
      {
        data: [15, 25, 20, 10, 25, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const wasteTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Food Waste (kg)',
        data: [2.3, 1.8, 3.5, 2.7, 1.5, 4.2, 2.1],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Food Saved (kg)',
        data: [0.5, 1.2, 0.8, 1.5, 2.0, 1.0, 2.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const spoilageReasonsData = {
    labels: ['Expired', 'Over-purchased', 'Leftovers', 'Poor Storage', 'Changed Plans'],
    datasets: [
      {
        label: 'Spoilage Reasons',
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',  // primary-500
          'rgba(14, 165, 233, 0.7)', // secondary-500
          'rgba(249, 115, 22, 0.7)', // accent-500
          'rgba(99, 102, 241, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
      },
    ],
  }

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Waste',
      value: '24.5 kg',
      change: '-12%',
      isPositive: true,
      icon: <FiTrendingDown className="text-primary-500" />,
      description: 'vs. last month',
    },
    {
      title: 'Food Saved',
      value: '18.2 kg',
      change: '+23%',
      isPositive: true,
      icon: <FiTrendingUp className="text-secondary-500" />,
      description: 'vs. last month',
    },
    {
      title: 'Spoilage Rate',
      value: '15%',
      change: '-8%',
      isPositive: true,
      icon: <FiAlertCircle className="text-accent-500" />,
      description: 'vs. last month',
    },
    {
      title: 'NGO Donations',
      value: '12',
      change: '+4',
      isPositive: true,
      icon: <FiCheckCircle className="text-green-500" />,
      description: 'successful pickups',
    },
  ]

  // Waste reduction tips
  const wasteTips = [
    {
      title: 'Store bread in a cloth bag',
      description: 'You waste bread 3x/week. Try storing it in a cloth bag in a cool, dry place to extend freshness.',
      category: 'Storage',
    },
    {
      title: 'Plan meals around leftovers',
      description: 'Your cooked meals often go to waste. Try planning your next day\'s meals to incorporate leftovers.',
      category: 'Planning',
    },
    {
      title: 'Freeze extra vegetables',
      description: 'Vegetables are your most wasted item. Blanch and freeze extras before they spoil.',
      category: 'Preservation',
    },
  ]

  // Recent food logs
  const recentLogs = [
    {
      id: 1,
      name: 'Vegetable Biryani',
      quantity: '2.5 kg',
      date: '2023-09-15',
      status: 'Redistributed',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      name: 'Fresh Apples',
      quantity: '1.2 kg',
      date: '2023-09-14',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      name: 'Milk',
      quantity: '1 liter',
      date: '2023-09-13',
      status: 'Expired',
      statusColor: 'bg-red-100 text-red-800',
    },
  ]

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your waste analytics...</p>
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
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Waste Analytics Dashboard</h1>
            <p className="text-gray-600">Track, analyze, and optimize your food waste patterns</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            <button 
              onClick={() => setTimeRange('week')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeRange('month')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === 'month' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeRange('year')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === 'year' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Year
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <motion.div 
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">{stat.description}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-card mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'trends' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Waste Trends
              </button>
              <button
                onClick={() => setActiveTab('spoilage')}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'spoilage' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Spoilage Analysis
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'logs' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Recent Logs
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiPieChart className="mr-2" /> Waste by Food Type
                  </h3>
                  <div className="h-64 flex items-center justify-center">
                    <Pie 
                      data={wasteByTypeData} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                              }
                            }
                          }
                        },
                        animation: {
                          animateScale: true,
                          animateRotate: true
                        }
                      }} 
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiBarChart2 className="mr-2" /> Spoilage Reasons
                  </h3>
                  <div className="h-64">
                    <Bar 
                      data={spoilageReasonsData} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Percentage (%)',
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Reason',
                            },
                          },
                        },
                        animation: {
                          delay: (context) => context.dataIndex * 100,
                        },
                      }} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trends Tab */}
            {activeTab === 'trends' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingDown className="mr-2" /> Waste Trends Over Time
                </h3>
                <div className="h-80">
                  <Line 
                    data={wasteTrendData} 
                    options={{
                      responsive: true,
                      plugins: {
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                        },
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Weight (kg)',
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Day of Week',
                          },
                        },
                      },
                      animation: {
                        tension: {
                          duration: 1000,
                          easing: 'linear',
                          from: 0.8,
                          to: 0.2,
                          loop: true
                        }
                      }
                    }} 
                  />
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">Most Improved</h4>
                    <p className="text-green-700">Bread waste reduced by 35%</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <h4 className="font-medium text-red-800 mb-2">Needs Attention</h4>
                    <p className="text-red-700">Vegetable waste increased by 12%</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">Prediction</h4>
                    <p className="text-blue-700">Expected 18% reduction next month</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Spoilage Analysis Tab */}
            {activeTab === 'spoilage' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <FiAlertCircle className="mr-2" /> Spoilage Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-lg mb-4">Average Time to Spoilage</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bread</span>
                          <span className="text-sm text-gray-600">4 days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full progress-bar-animate" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Vegetables</span>
                          <span className="text-sm text-gray-600">6 days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-secondary-500 h-2 rounded-full progress-bar-animate" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Dairy</span>
                          <span className="text-sm text-gray-600">7 days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-accent-500 h-2 rounded-full progress-bar-animate" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Cooked Meals</span>
                          <span className="text-sm text-gray-600">3 days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full progress-bar-animate" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-lg mb-4">Common Spoilage Factors</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-xs">1</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Improper Storage Temperature</p>
                          <p className="text-sm text-gray-600">Affects 45% of your spoiled items</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                          <span className="text-orange-600 text-xs">2</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Purchasing Too Much</p>
                          <p className="text-sm text-gray-600">Affects 30% of your spoiled items</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5">
                          <span className="text-yellow-600 text-xs">3</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Forgetting About Leftovers</p>
                          <p className="text-sm text-gray-600">Affects 15% of your spoiled items</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs">4</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Poor Packaging</p>
                          <p className="text-sm text-gray-600">Affects 10% of your spoiled items</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <h4 className="font-medium text-lg mb-4 text-primary-800">AI-Powered Recommendations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-primary-700">Storage Optimization</h5>
                      <p className="text-sm text-gray-600 mt-1">Store vegetables in the crisper drawer with a damp paper towel to extend freshness by up to 4 days.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-primary-700">Shopping Habits</h5>
                      <p className="text-sm text-gray-600 mt-1">Consider buying smaller quantities of bread twice a week instead of a large amount once weekly.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-primary-700">Meal Planning</h5>
                      <p className="text-sm text-gray-600 mt-1">Create a designated "eat soon" section in your refrigerator for items approaching their use-by date.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-primary-700">Preservation Methods</h5>
                      <p className="text-sm text-gray-600 mt-1">Freeze excess milk in ice cube trays for future use in smoothies or cooking.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Logs Tab */}
            {activeTab === 'logs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <FiCalendar className="mr-2" /> Recent Food Logs
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Item</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentLogs.map((log) => (
                        <motion.tr 
                          key={log.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: log.id * 0.1 }}
                          whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{log.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{log.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{log.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.statusColor}`}>
                              {log.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-lg mb-4">AI-Generated Waste Reduction Tips</h4>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-animate"
                  >
                    {wasteTips.map((tip, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-primary-200 transition-colors"
                      >
                        <div className="flex items-start mb-2">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 text-xs font-medium mr-2">
                            {index + 1}
                          </span>
                          <h5 className="font-medium text-gray-900">{tip.title}</h5>
                        </div>
                        <p className="text-sm text-gray-600 ml-8">{tip.description}</p>
                        <div className="mt-2 ml-8">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {tip.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Personalized Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Personalized Recommendations</h2>
              <p className="text-gray-600">AI-powered suggestions based on your waste patterns</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 btn-secondary flex items-center gap-2"
            >
              Refresh Recommendations
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
              <h3 className="text-lg font-semibold mb-4 text-primary-800">Weekly Action Plan</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary-700 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Meal prep Sunday</p>
                    <p className="text-sm text-gray-600">Plan your meals for the week to reduce impulse purchases and food waste.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary-700 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Inventory check Wednesday</p>
                    <p className="text-sm text-gray-600">Mid-week check of your refrigerator to use items approaching expiration.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary-700 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Freezer Friday</p>
                    <p className="text-sm text-gray-600">Freeze any unused perishables before the weekend to extend their life.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
              <h3 className="text-lg font-semibold mb-4 text-secondary-800">Smart Shopping Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-secondary-700 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Buy smaller quantities more frequently</p>
                    <p className="text-sm text-gray-600">Based on your waste patterns, consider smaller, more frequent purchases of fresh produce.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-secondary-700 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Use a shopping list app</p>
                    <p className="text-sm text-gray-600">Your unplanned purchases are 40% more likely to be wasted. Stick to a list!</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-200 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-secondary-700 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Consider frozen alternatives</p>
                    <p className="text-sm text-gray-600">For items you frequently waste, try frozen versions that last longer.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage