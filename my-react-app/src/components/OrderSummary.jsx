import { motion } from 'framer-motion'
import './OrderSummary.css'

const OrderSummary = ({ items, pricing, orderId }) => {
  const formatPrice = (price) => {
    return `R${price.toFixed(2)}`
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }
  
  return (
    <motion.div 
      className="order-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="summary-header">
        <h3>Order Summary</h3>
        <div className="order-id">#{orderId}</div>
      </div>
      
      <div className="items-list">
        {items.map((item, index) => (
          <motion.div 
            key={item.id}
            className="item"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <div className="item-info">
              <div className="item-quantity">{item.quantity}</div>
              {/* <div className="item-details">
                <h4>{item.name}</h4>
                {item.notes && <p className="item-notes">{item.notes}</p>}
              </div> */}
            </div>
            <div className="item-price">{formatPrice(item.price * item.quantity)}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>{formatPrice(pricing.subtotal)}</span>
        </div>
        
        <div className="total-row">
          <span>Tax</span>
          <span>{formatPrice(pricing.tax)}</span>
        </div>
        
        <div className="total-row">
          <span>Delivery Fee</span>
          <span>{formatPrice(pricing.deliveryFee)}</span>
        </div>
        
        <div className="total-row">
          <span>Driver Tip</span>
          <span>{formatPrice(pricing.tip)}</span>
        </div>
        
        <div className="total-row grand-total">
          <span>Total</span>
          <span>{formatPrice(pricing.total)}</span>
        </div>
      </div>
      
      <motion.button
        className="receipt-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        📄 Download Receipt
      </motion.button>
    </motion.div>
  )
}

export default OrderSummary
