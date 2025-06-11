import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrderStatus from './OrderStatus';
import './DeliveryTracker.css';

const DeliveryTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await fetch(`http://localhost:3000/deliveries/${id}`);
        const data = await response.json();

        setOrderData({
          id: data.id,
          status: data.DeliveryStatus,
          placedAt: data.PlacedAt,
          estimatedDeliveryTime: data.EstimatedTime,
          statusUpdatedAt: data.StatusUpdatedAt
        });
      } catch (error) {
        console.error('Failed to fetch delivery:', error);
      }
    };

    fetchDelivery();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

  const statusOrder = ['Preparing', 'On the Way', 'Delivered'];

  const handleNextStatus = () => {
    const currentIndex = statusOrder.indexOf(orderData.status);
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      setOrderData((prev) => ({
        ...prev,
        status: nextStatus,
        statusUpdatedAt: new Date().toISOString()
      }));
    }
  };

  const goToReviewPage = () => navigate('/review');

  if (!orderData) return <div>Loading order data...</div>;

  return (
    <motion.div
      className="delivery-tracker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Order header */}
      <div className="order-header">
        <div className="order-info">
          <h2>Order #{orderData.id}</h2>
          <p className="order-date">
            Placed on {formatDate(orderData.placedAt)}
          </p>
        </div>

        {orderData.status !== 'Delivered' && (
          <div className="estimated-delivery">
            <p>Estimated Delivery</p>
            <p className="delivery-time">
              {formatDate(orderData.estimatedDeliveryTime)}
            </p>
          </div>
        )}
      </div>

      {/* Live status tracker */}
      <OrderStatus
        status={orderData.status}
        updatedAt={orderData.statusUpdatedAt}
      />

      {/* Demo controls / review action */}
      {orderData.status !== 'Delivered' ? (
        <div className="demo-controls">
          <button className="demo-button" onClick={handleNextStatus}>
            Simulate Next Status (Demo)
          </button>
        </div>
      ) : (
        <div className="review-action">
          <button className="review-button" onClick={goToReviewPage}>
            Leave a Review
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DeliveryTracking;
