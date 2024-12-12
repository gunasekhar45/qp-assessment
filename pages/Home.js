import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h2>Available Products</h2>
      <ProductList products={products} />
    </div>
  );
};

export default Home;

