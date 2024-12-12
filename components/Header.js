import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container">
        <h1>Grocery Booking</h1>
        <nav>
          {user ? (
            <>
              <Link to="/">Products</Link>
              <Link to="/cart">Cart ({cart.length})</Link>
              {user.role === 'ROLE_ADMIN' && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

