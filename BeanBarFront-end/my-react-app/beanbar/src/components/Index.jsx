import { useState } from 'react';
import { motion } from 'framer-motion';
import OrderStatus from '../components/OrderStatus';
import DriverInfo from '../components/DriverInfo';
import OrderSummary from '../components/OrderSummary';
import { mockOrder } from '../data/mockData';
import './Index.css';

const Index = () => {
  // Temporary mock states
  const [showReview, setShowReview] = useState(false);
  const cartItems = mockOrder.items || [];
  const calculatedPricing = mockOrder.pricing || {};

  return (
    <div className="delivery-tracking">
      {/* Coffee Bean Background Pattern */}
      <div className="coffee-background"></div>

      <div className="container">
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

          {/* <div className="right-column">
            {!showReview && (
              <OrderSummary 
                items={cartItems} 
                pricing={totalPrice} 
              />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
