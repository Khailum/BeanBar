import { motion } from 'framer-motion'
import './DriverDetail.css'

const DriverDetails = ({ driver }) => {
  return (
    <motion.div 
      className="driver-details"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Driver Details</h3>
      
      <div className="driver-card">
        <div className="driver-photo-container">
          <img 
            src={driver.photo} 
            alt={`Driver ${driver.name}`}
            className="driver-photo"
          />
          <div className="driver-rating">
            <span className="star">★</span> {driver.rating}
          </div>
        </div>
        
        <div className="driver-info">
          <h4>{driver.name}</h4>
          <p className="driver-id">ID: {driver.id}</p>
          
          <div className="driver-contact">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5.5C21 14.06 14.06 21 5.5 21H3C2.44772 21 2 20.5523 2 20V17.5C2 16.9477 2.44772 16.5 3 16.5H5.5C6.6 16.5 7.5 15.6 7.5 14.5V12.5C7.5 11.4 6.6 10.5 5.5 10.5H4C3.44772 10.5 3 10.0523 3 9.5V3C3 2.44772 3.44772 2 4 2H5.5C14.06 2 21 8.94 21 17.5V20C21 20.5523 20.5523 21 20 21H17.5C16.9477 21 16.5 20.5523 16.5 20V17.5C16.5 16.4 15.6 15.5 14.5 15.5H12.5C11.4 15.5 10.5 16.4 10.5 17.5V19C10.5 19.5523 10.0523 20 9.5 20H3" stroke="#D4B996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href={`tel:${driver.phone}`}>{driver.phone}</a>
            </div>
            
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="#D4B996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Message Driver</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="vehicle-info">
        <h4>Vehicle Information</h4>
        <div className="vehicle-details">
          <div className="vehicle-type">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 17H6C3.79086 17 2 15.2091 2 13V11C2 8.79086 3.79086 7 6 7H18C20.2091 7 22 8.79086 22 11V13C22 15.2091 20.2091 17 18 17H16M8 17L10 20M8 17H16M16 17L14 20" stroke="#D4B996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="14" r="1" fill="#D4B996"/>
              <circle cx="17" cy="14" r="1" fill="#D4B996"/>
            </svg>
            <span>{driver.vehicle.type}</span>
          </div>
          <div className="license-plate">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#D4B996" strokeWidth="2"/>
              <path d="M7 16V8M12 16V8M17 12H7" stroke="#D4B996" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{driver.vehicle.licensePlate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DriverDetails;