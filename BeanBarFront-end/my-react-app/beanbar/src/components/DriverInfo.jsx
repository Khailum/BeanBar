import { motion } from 'framer-motion';
import './DriverInfo.css';

const DriverInfo = ({ driver, estimatedDelivery }) => {
  return (
    <motion.div 
      className="driver-info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="driver-header">
        <h3>Your Driver</h3>
        <div className="eta">ETA: {estimatedDelivery}</div>
      </div>
      
      <div className="driver-details">
        <motion.div
          className="driver-photo-container"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={driver.photo} 
            alt={driver.name}
            className="driver-photo"
          />
          <div className="online-indicator"></div>
        </motion.div>
        
        <div className="driver-info-text">
          <h4>{driver.name}</h4>
          <div className="rating">
            <span className="star">★</span>
            <span>{driver.rating}</span>
          </div>
        </div>
        
        <motion.button
          className="call-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📞 Call
        </motion.button>
      </div>
      
      <div className="vehicle-info">
        <span>🚗 {driver.vehicle}</span>
        <span className="license-plate">{driver.licensePlate}</span>
      </div>
    </motion.div>
  );
};

export default DriverInfo;
