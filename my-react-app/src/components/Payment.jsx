import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseTotal = location.state?.totalPrice || 0;

  const [deliveryOption, setDeliveryOption] = useState("instore");
  const [finalTotal, setFinalTotal] = useState(baseTotal);

  const DELIVERY_FEE = 15;

  useEffect(() => {
    if (deliveryOption === "delivery") {
      setFinalTotal(baseTotal + DELIVERY_FEE);
    } else {
      setFinalTotal(baseTotal);
    }
  }, [deliveryOption, baseTotal]);

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment of R${finalTotal.toFixed(2)} Successful!`);
    navigate("/");
  };

  return (
    <div className="payment-section">
      <div className="payment-wrapper">
        <form className="form-horizontal" onSubmit={handlePayment}>
          <h2 className="section-header">Payment <span>DETAILS</span> </h2>
         

          <div className="form-group">
            <label className="delivery-label">
              <input
                type="radio"
                value="instore"
                checked={deliveryOption === "instore"}
                onChange={() => setDeliveryOption("instore")}
              />
              In-Store Pickup (Free)
            </label>
            <label className="delivery-label">
              <input
                type="radio"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
              />
              Delivery (+R{DELIVERY_FEE})
            </label>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Name on Card"
              required
            />
            <input
              className="form-control"
              type="text"
              placeholder="Card Number"
              required
            />
            <input
              className="form-control"
              type="text"
              placeholder="Expiry Date (MM/YY)"
              required
            />
            <input
              className="form-control"
              type="password"
              placeholder="CVV"
              required
            />
          </div>

          <p className="total-amount">
            <strong>Total: R{finalTotal.toFixed(2)}</strong>
          </p>

          <button type="submit" className="send-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
