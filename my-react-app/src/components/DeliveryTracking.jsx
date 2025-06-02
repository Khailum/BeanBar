// DeliveryTracking.jsx
import React from 'react';
import DeliveryMap from './DeliveryMap.jsx';

const DeliveryTracking = () => {
  // Hardcoded order summary and driver details
  const orderSummary = {
    orderId: 'BB123456',
    items: [
      { name: 'Latte', quantity: 2, price: 45 },
      { name: 'Croissant', quantity: 1, price: 25 },
    ],
    total: 115,
    status: 'Out for Delivery',
    deliveryAddress: '1 Infinite Loop, Cupertino, CA',
  };

  const driverInfo = {
    name: 'Lebo Mtomboti',
    phone: '082 123 4567',
    vehicle: 'Yamaha Delivery Scooter',
    origin: '1600 Amphitheatre Parkway, Mountain View, CA',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Delivery Tracking</h2>

      {/* Order Summary */}
      <section style={sectionStyle}>
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> {orderSummary.orderId}</p>
        <ul>
          {orderSummary.items.map((item, i) => (
            <li key={i}>
              {item.quantity} x {item.name} - R{item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> R{orderSummary.total}</p>
        <p><strong>Status:</strong> {orderSummary.status}</p>
        <p><strong>Delivery Address:</strong> {orderSummary.deliveryAddress}</p>
      </section>

      {/* Driver Info */}
      <section style={sectionStyle}>
        <h3>Driver Details</h3>
        <p><strong>Name:</strong> {driverInfo.name}</p>
        <p><strong>Phone:</strong> {driverInfo.phone}</p>
        <p><strong>Vehicle:</strong> {driverInfo.vehicle}</p>
        <p><strong>Coming from:</strong> {driverInfo.origin}</p>
      </section>

      {/* Map */}
      <DeliveryMap
        driverAddress={driverInfo.origin}
        deliveryAddress={orderSummary.deliveryAddress}
      />
    </div>
  );
};

const sectionStyle = {
  marginBottom: '2rem',
  border: '1px solid #ccc',
  padding: '1rem',
  borderRadius: '8px',
};

export default DeliveryTracking;
