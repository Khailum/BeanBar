import { motion } from 'framer-motion'
import { statusSteps } from '../data/mockData'
import './OrderStatus.css'

const OrderStatus = ({ status, updatedAt }) => {
  const currentIndex = statusSteps.findIndex(step => step.key === status)
  
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }
    return new Date(dateString).toLocaleTimeString('en-US', options)
  }

  return (
    <div className="order-status">
      <div className="status-header">
        <h3>Current Status</h3>
        <span className="status-badge" data-status={status}>
          {statusSteps.find(step => step.key === status)?.label}
        </span>
      </div>
      
      <p className="status-updated">
        Last updated at {formatTime(updatedAt)}
      </p>
      
      <div className="status-timeline">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex
          const isCurrent = index === currentIndex
          
          return (
            <div 
              key={step.key} 
              className={`timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="timeline-connector">
                {index > 0 && (
                  <div className={`connector-line ${index <= currentIndex ? 'active' : ''}`}></div>
                )}
                <motion.div 
                  className="connector-dot"
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: isCurrent ? [0.8, 1.2, 1] : 1,
                    backgroundColor: isCompleted ? 'var(--status-delivered)' : 'var(--medium-gray)'
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: isCurrent ? Infinity : 0,
                    repeatType: "reverse",
                    repeatDelay: 2
                  }}
                ></motion.div>
              </div>
              
              <div className="timeline-content">
                <h4>{step.label}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderStatus