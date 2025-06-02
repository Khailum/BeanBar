import { motion } from 'framer-motion';
import OrderStatus from '../components/OrderStatus'

import DriverInfo from '../components/DriverInfo';
import OrderSummary from '../components/OrderSummary';
import { mockOrder } from '../data/mockData';
import './Index.css';

const Index = () => {
  return (
    <div className="delivery-tracking">
      {/* Coffee Bean Background Pattern */}
      <div className="coffee-background"></div>
      
      <div className="container">
        {/* Header */}
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-content">
            <button className="back-button">← Back</button>
            <div className="brand">
              <h1>BeanBar</h1>
              <p>Premium Coffee Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* Delivery Address */}
        <motion.div 
          className="delivery-address"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="address-content">
            <h3>📍 Delivering to</h3>
            <p>{mockOrder.deliveryAddress.street}</p>
            <p>{mockOrder.deliveryAddress.area}, {mockOrder.deliveryAddress.city}</p>
            {mockOrder.deliveryAddress.instructions && (
              <p className="instructions">Note: {mockOrder.deliveryAddress.instructions}</p>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="content-grid">
          <div className="left-column">
            <OrderStatus 
              status={mockOrder.status} 
              updatedAt={mockOrder.updatedAt} 
            />
            <DriverInfo 
              driver={mockOrder.driver} 
              estimatedDelivery={mockOrder.estimatedDelivery} 
            />
          </div>
          
          <div className="right-column">
            <OrderSummary 
              items={mockOrder.items} 
              pricing={mockOrder.pricing}
              orderId={mockOrder.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
