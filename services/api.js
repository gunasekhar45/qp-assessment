import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // Handle 401 error (e.g., redirect to login page)
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Fetch products
export const getProducts = async () => {
  try {
    const response = await api.get('/user/grocery-items');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Login
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Register
export const register = async (username, password) => {
  try {
    const response = await api.post('/auth/register', { username, password, role: 'ROLE_USER' });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Create order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/user/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders
export const getOrders = async () => {
  try {
    const response = await api.get('/user/orders');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
};

// Add product
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/admin/grocery-items', productData);
    return response.data;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/admin/grocery-items/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/grocery-items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};

// Get admin orders
export const getAdminOrders = async () => {
  try {
    const response = await api.get('/admin/orders');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(`/admin/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error;
  }
};

