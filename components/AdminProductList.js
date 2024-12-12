import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', inventory: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/grocery-items');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/admin/grocery-items', newProduct);
      setNewProduct({ name: '', price: '', inventory: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateInventory = async (id, change) => {
    try {
      const product = products.find(p => p.id === id);
      await axios.put(`http://localhost:8080/api/admin/grocery-items/${id}`, {
        ...product,
        inventory: product.inventory + change
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/grocery-items/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-product-list container">
      <h2>Manage Products</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Inventory"
          value={newProduct.inventory}
          onChange={(e) => setNewProduct({ ...newProduct, inventory: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.inventory}</td>
              <td>
                <button onClick={() => handleUpdateInventory(product.id, 1)}>+</button>
                <button onClick={() => handleUpdateInventory(product.id, -1)}>-</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;

