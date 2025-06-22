import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMessageSquare, FiSend, FiEdit2, FiTrash2, FiCheck, FiX, FiClock, FiFilter } from 'react-icons/fi'

const MessagesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMessages([
        {
          id: 1,
          ngo: 'Food For All',
          food: 'Vegetable Biryani (2.5 kg)',
          text: 'Hi Food For All! We have 2.5kg of fresh Vegetable Biryani in excellent condition. It was prepared today at 2:30 PM and needs to be picked up before 8:30 PM. Our location is 1.2km from you. Would you be able to collect it? Please reply as soon as possible.',
          status: 'sent',
          response: 'We can pick it up at 7:00 PM. Thank you for your donation!',
          timestamp: '2023-09-15 15:45',
        },
        {
          id: 2,
          ngo: 'Community Kitchen',
          food: 'Fresh Apples (1.2 kg)',
          text: 'Hello Community Kitchen! We have 1.2kg of fresh apples available for donation. They were purchased yesterday and are in perfect condition. Would you be interested in collecting them today before 6:00 PM? We\'re located 3.5km from your facility.',
          status: 'draft',
          response: null,
          timestamp: '2023-09-15 14:30',
        },
        {
          id: 3,
          ngo: 'Shelter Meals',
          food: 'Milk (1 liter)',
          text: 'Hi Shelter Meals! We have 1 liter of milk available for donation. It was opened 2 days ago and has been properly refrigerated. It expires in 5 days. Would you be able to use this for your morning meals? Please let us know if you can pick it up today.',
          status: 'pending',
          response: null,
          timestamp: '2023-09-15 10:15',
        },
      ])
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

  // Filter messages based on status
  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(message => message.status === filter)

  // Handle message edit
  const handleEdit = (message) => {
    setEditingId(message.id)
    setEditText(message.text)
  }

  // Save edited message
  const handleSaveEdit = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, text: editText } : message
    ))
    setEditingId(null)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
  }

  // Send draft message
  const handleSend = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'pending' } : message
    ))
  }

  // Delete message
  const handleDelete = (id) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">NGO Messages</h1>
          <p className="text-xl text-gray-600">
            View, edit and send AI-generated messages to NGOs for food pickup
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-accent-100 text-accent-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('draft')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'draft' ? 'bg-accent-100 text-accent-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Drafts
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-accent-100 text-accent-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('sent')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'sent' ? 'bg-accent-100 text-accent-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Sent
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Sort by:</span>
            <select className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>NGO name</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <motion.div 
                key={message.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-card overflow-hidden"
              >
                <div className="border-b border-gray-100 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                        <FiMessageSquare className="text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{message.ngo}</h3>
                        <p className="text-sm text-gray-600">{message.food}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(message.status)}`}>
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FiClock className="mr-1" /> {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {editingId === message.id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[120px]"
                      />
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <FiX className="mr-2" /> Cancel
                        </button>
                        <button 
                          onClick={() => handleSaveEdit(message.id)}
                          className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center"
                        >
                          <FiCheck className="mr-2" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-800 mb-6">{message.text}</p>
                      
                      {message.response && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 border-l-4 border-green-500">
                          <h4 className="font-medium mb-2 text-green-700">Response from {message.ngo}:</h4>
                          <p className="text-gray-700">{message.response}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3">
                        {message.status === 'draft' && (
                          <>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(message)}
                              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                            >
                              <FiEdit2 className="mr-2" /> Edit
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSend(message.id)}
                              className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center"
                            >
                              <FiSend className="mr-2" /> Send
                            </motion.button>
                          </>
                        )}
                        {message.status === 'pending' && (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(message)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                          >
                            <FiEdit2 className="mr-2" /> Edit
                          </motion.button>
                        )}
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(message.id)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center"
                        >
                          <FiTrash2 className="mr-2" /> Delete
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-card">
              <FiMessageSquare className="w-12 h-12 mx-auto text-gray-300" />
              <h3 className="mt-4 text-gray-500">{filter === 'all' 
                ? "You don\'t have any messages yet."
                : `You don\'t have any ${filter} messages.`}</h3>
            </div>
          )}
        </motion.div>

        {/* AI Message Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-card p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Generate New Messages</h2>
              <p className="opacity-90">
                Let our AI draft personalized messages for your surplus food items
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-accent-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create New Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MessagesPage