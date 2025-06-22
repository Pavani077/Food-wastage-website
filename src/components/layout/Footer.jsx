import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  const footerLinks = [
    { title: 'Platform', links: [
      { name: 'Home', path: '/' },
      { name: 'Log Food', path: '/input' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'AI Insights', path: '/ai-decisions' },
    ]},
    { title: 'Resources', links: [
      { name: 'About Us', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Partners', path: '#' },
      { name: 'Contact', path: '#' },
    ]},
    { title: 'Legal', links: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ]},
  ]

  const socialLinks = [
    { icon: <FiGithub />, path: '#', label: 'GitHub' },
    { icon: <FiTwitter />, path: '#', label: 'Twitter' },
    { icon: <FiInstagram />, path: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="font-bold text-xl text-gradient">WasteWise</span>
            </Link>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-gray-600 max-w-md"
            >
              An AI-powered platform helping reduce food waste through intelligent tracking, 
              prediction, and redistribution of surplus food to those in need.
            </motion.p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-600 hover:text-primary-500 transition-colors"
                  whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WasteWise. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0 flex items-center">
            Made with <FiHeart className="mx-1 text-accent-500" /> for a sustainable future
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer