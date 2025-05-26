import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseTotal = location.state?.totalPrice || 0;

  const [deliveryOption, setDeliveryOption] = useState("instore");
  const [finalTotal, setFinalTotal] = useState(baseTotal);

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardError, setCardError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [expiryError, setExpiryError] = useState("");

  const DELIVERY_FEE = 15;

  useEffect(() => {
    if (deliveryOption === "delivery") {
      setFinalTotal(baseTotal + DELIVERY_FEE);
    } else {
      setFinalTotal(baseTotal);
    }
  }, [deliveryOption, baseTotal]);

  const validateCardNumber = (number) => {
    const clean = number.replace(/\s+/g, "");
    const visa = /^4\d{12}(\d{3})?$/;
    const mastercard = /^(5[1-5]\d{14}|2(2[2-9][1-9]|2[3-9]\d|[3-6]\d{2}|7([01]\d|20))\d{12})$/;
    return visa.test(clean) || mastercard.test(clean);
  };

  const validateCvv = (code) => /^\d{3}$/.test(code);

  // New expiry date validator
  const validateExpiryDate = (dateStr) => {
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(dateStr)) {
      return false;
    }
    const [monthStr, yearStr] = dateStr.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    // Check month range 1-12
    if (month < 1 || month > 12) {
      return false;
    }

    // Year must be 26 or greater (i.e., 2026 or later)
    if (year < 26) {
      return false;
    }

    // Check if expiry date is not in the past
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // last two digits
    const currentMonth = currentDate.getMonth() + 1; // zero-based

    if (year === currentYear && month < currentMonth) {
      return false;
    }

    if (year < currentYear) {
      return false;
    }

    return true;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (finalTotal <= 15) {
      alert("Total must be greater than R15.00 to proceed with payment.");
      return;
    }

    let valid = true;

    if (!validateCardNumber(cardNumber)) {
      setCardError("Invalid card number. Only Visa and MasterCard are accepted.");
      valid = false;
    } else {
      setCardError("");
    }

    if (!validateCvv(cvv)) {
      setCvvError("CVV must be 3 digits.");
      valid = false;
    } else {
      setCvvError("");
    }

    if (!validateExpiryDate(expiryDate)) {
      setExpiryError("Invalid expiry date. Must be MM/YY format, year 26 or later, and not expired.");
      valid = false;
    } else {
      setExpiryError("");
    }

    if (valid) {
      alert(`Payment of R${finalTotal.toFixed(2)} Successful!`);
      navigate("/");
    }
  };

  return (
    <div className="payment-section">
      <div className="payment-wrapper">
        <form className="form-horizontal" onSubmit={handlePayment}>
          <h2 className="section-header">
            Payment <span>DETAILS</span>
          </h2>

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
              placeholder="Account Holder"
              required
            />
            <input
              className="form-control"
              type="text"
              placeholder="Account Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            {cardError && <p className="error-text">{cardError}</p>}
            <input
              className="form-control"
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            {cardError && <p className="error-text">{cardError}</p>}


            <input
              className="form-control"
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            {expiryError && <p className="error-text">{expiryError}</p>}

            <input
              className="form-control"
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            {cvvError && <p className="error-text">{cvvError}</p>}
          </div>

          <p className="total-amount">
            <strong>Total: R{finalTotal.toFixed(2)}</strong>
          </p>

          <button type="submit" className="send-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
