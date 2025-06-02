import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'  // <-- import this
import OrderStatus from './OrderStatus'
import DriverDetails from './DriverDetails'
import LocationInfo from './LocationInfo'
import OrderSummary from './OrderSummary'
import './DeliveryTracker.css'

const DeliveryTracking = ({ orderData, onUpdateStatus }) => {
  const navigate = useNavigate()  // <-- initialize navigate
  // Guard clause: show loading state if orderData is not available yet
  if (!orderData) {
    return <div>Loading order data...</div>
  }

  const [activeTab, setActiveTab] = useState('status')
  
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Simulate moving to the next status (demo only)
  const handleNextStatus = () => {
    const statusOrder = ['ordered', 'preparing', 'pickup', 'delivering', 'delivered']
    const currentIndex = statusOrder.indexOf(orderData.status)
    
    if (currentIndex < statusOrder.length - 1) {
      onUpdateStatus(statusOrder[currentIndex + 1])
    }
  }

  // Handler to navigate to review page
  const goToReviewPage = () => {
    navigate('/review')
  }

  return (
    <motion.div 
      className="delivery-tracker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="order-header">
        <div className="order-info">
          <h2>Order #{orderData.id}</h2>
          <p className="order-date">Placed on {formatDate(orderData.placedAt)}</p>
        </div>
        {orderData.status !== 'delivered' && (
          <div className="estimated-delivery">
            <p>Estimated Delivery</p>
            <p className="delivery-time">{formatDate(orderData.estimatedDeliveryTime)}</p>
          </div>
        )}
      </div>
      
      <div className="tracker-tabs">
        <button 
          className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Status
        </button>
        <button 
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Order Summary
        </button>
      </div>
      
      <div className="tracker-content">
        {activeTab === 'status' && (
          <OrderStatus 
            status={orderData.status} 
            updatedAt={orderData.statusUpdatedAt} 
          />
        )}
        
        {activeTab === 'details' && (
          <div className="details-container">
            <DriverDetails driver={orderData.driver} />
            <LocationInfo 
              source={orderData.source} 
              destination={orderData.destination}
              status={orderData.status}
            />
          </div>
        )}
        
        {activeTab === 'summary' && (
          <OrderSummary 
            items={orderData.items} 
            pricing={orderData.pricing}
          />
        )}
      </div>
      
      {/* Demo controls - would be removed in production */}
      {orderData.status !== 'delivered' && (
        <div className="demo-controls">
          <button className="demo-button" onClick={handleNextStatus}>
            Simulate Next Status (Demo)
          </button>
        </div>
      )}

      {/* REVIEW BUTTON shown only if order is delivered */}
      {orderData.status === 'delivered' && (
        <div className="review-action">
          <button className="review-button" onClick={goToReviewPage}>
            Leave a Review
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default DeliveryTracking;
