// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">MAYOU</Link>
        <nav className="header-nav">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Panier ({totalItems})</Link>
        </nav>
      </div>
    </header>
  );
}
