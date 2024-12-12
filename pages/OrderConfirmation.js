import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your order. Your groceries will be delivered soon.</p>
      <Link to="/" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;

