import { motion } from 'framer-motion'
import './OrderSummary.css'

const OrderSummary = ({ items, pricing }) => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Order Summary</h3>
{/*       
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
              <div className="item-quantity">{item.quantity}×</div>
              <div className="item-details">
                <h4>{item.name}</h4>
                {item.notes && <p className="item-notes">{item.notes}</p>}
              </div>
            </div>
            <div className="item-price">{formatPrice(item.price * item.quantity)}</div>
          </motion.div>
        ))}
      </div> */}
      
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
      
      {/* <div className="download-receipt">
        <button className="receipt-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Receipt
        </button>
      </div> */}
    </motion.div>
  )
}

export default OrderSummary