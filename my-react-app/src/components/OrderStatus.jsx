import { motion } from 'framer-motion';
import { statusSteps } from '../data/mockData';
import './OrderStatus.css';

const OrderStatus = ({ status, updatedAt }) => {
  const currentIndex = statusSteps.findIndex(step => step.key === status);

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  return (
    <motion.div 
      className="order-status"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="status-header">
        <h3>Order Status</h3>
        <div className="last-updated">
          🕒 Updated {formatTime(updatedAt)}
        </div>
      </div>
      
      <div className="status-timeline">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <motion.div 
              key={step.key} 
              className={`timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {index < statusSteps.length - 1 && (
                <div className={`timeline-connector ${isCompleted ? 'active' : ''}`} />
              )}
              
              <motion.div 
                className="timeline-dot"
                animate={isCurrent ? { 
                  scale: [1, 1.2, 1],
                  boxShadow: ['0 0 0 0 rgba(212, 165, 116, 0.7)', '0 0 0 10px rgba(212, 165, 116, 0)', '0 0 0 0 rgba(212, 165, 116, 0)']
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: isCurrent ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {isCompleted ? '✓' : '○'}
              </motion.div>
              
              <div className="timeline-content">
                <h4>{step.label}</h4>
                <p>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OrderStatus;
