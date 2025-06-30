import { motion } from 'framer-motion';
import './LocationInfo.css';
import DeliveryMap from './DeliveryMap'; // Make sure path is correct

const LocationInfo = ({ source, destination, status }) => {
  const getProgressPercentage = () => {
    const statusMap = {
      'ordered': 0,
      'preparing': 25,
      'pickup': 50,
      'delivering': 75,
      'delivered': 100,
    };
    return statusMap[status] || 0;
  };

  return (
    <motion.div 
      className="location-info"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Delivery Route</h3>

      <div className="route-map">
        {/* Progress Bar */}
        <div className="route-progress">
          <div className="progress-track">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            ></motion.div>

            <div className={`location-point source ${status !== 'ordered' ? 'passed' : ''}`}>
              <div className="point-marker"></div>
            </div>

            <div className={`location-point midpoint ${status === 'delivering' || status === 'delivered' ? 'passed' : ''}`}>
              <div className="point-marker"></div>
            </div>

            <div className={`location-point destination ${status === 'delivered' ? 'passed' : ''}`}>
              <div className="point-marker"></div>
            </div>
          </div>
        </div>

        {/* Delivery Map Injected */}
        <div style={{ margin: '20px 0' }}>
          <DeliveryMap 
            driverAddress={source.address}
            deliveryAddress={destination.address}
          />
        </div>

        {/* Location Details */}
        <div className="locations-container">
          <div className="location from">
            <h4>From</h4>
            <div className="location-details">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#D4B996" strokeWidth="2" /><path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#D4B996" strokeWidth="2" /></svg>
              <div>
                <p className="location-name">{source.name}</p>
                <p className="location-address">{source.address}</p>
                <a href={`tel:${source.phone}`} className="location-phone">{source.phone}</a>
              </div>
            </div>
          </div>

          <div className="location to">
            <h4>To</h4>
            <div className="location-details">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#F7E6D4" strokeWidth="2" /><path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#F7E6D4" strokeWidth="2" /></svg>
              <div>
                <p className="location-address">{destination.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Delivery Info */}
      <div className="delivery-info">
        <div className="info-item">
          <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#D4B996" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="#D4B996" strokeWidth="2" /></svg>
          <div>
            <p className="info-label">Estimated Delivery Time</p>
            <p className="info-value">25-35 min</p>
          </div>
        </div>

        <div className="info-item">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="#D4B996" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="#D4B996" strokeWidth="2"/></svg>
          <div>
            <p className="info-label">Distance</p>
            <p className="info-value">2.4 miles</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationInfo;
