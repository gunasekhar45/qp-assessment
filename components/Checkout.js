import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderItems = cart.map(item => ({
        groceryItem: { id: item.id },
        quantity: item.quantity
      }));

      await axios.post('http://localhost:8080/api/user/orders', { orderItems });
      clearCart();
      navigate('/');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout container">
      <h2>Checkout</h2>
      {cart.map((item) => (
        <div key={item.id} className="checkout-item">
          <span>{item.name}</span>
          <span>{item.quantity} x ${item.price.toFixed(2)}</span>
        </div>
      ))}
      <div className="checkout-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default Checkout;

