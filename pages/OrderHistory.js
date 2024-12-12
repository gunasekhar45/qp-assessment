import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h3>Order #{order.id}</h3>
          <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <h4>Items:</h4>
          <ul>
            {order.orderItems.map(item => (
              <li key={item.id}>
                {item.groceryItem.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

