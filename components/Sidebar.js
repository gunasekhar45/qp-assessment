import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/products"><i className="fas fa-shopping-bag"></i> Products</Link></li>
          <li><Link to="/orders"><i className="fas fa-clipboard-list"></i> Orders</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

