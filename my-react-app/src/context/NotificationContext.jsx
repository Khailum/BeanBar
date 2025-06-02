import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../context/Notification.css'
 
const NotificationContext = createContext(null)
 
export const useNotification = () => useContext(NotificationContext)
 
const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)
 
  const showNotification = (message, type = 'success', duration = 5000) => {
    setNotification({ message, type })
   
    if (duration) {
      setTimeout(() => {
        setNotification(null)
      }, duration)
    }
  }
 
  const hideNotification = () => {
    setNotification(null)
  }
 
  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="notification-content">
              <div className="notification-icon">
                {notification.type === 'success' && (
                  <svg width="24\" height="24\" viewBox="0 0 24 24\" fill="none\" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z\" fill="currentColor"/>
                  </svg>
                )}
                {notification.type === 'error' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <p>{notification.message}</p>
              <button onClick={hideNotification} className="notification-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  )
}
 
export default NotificationProvider