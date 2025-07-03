// src/pages/Cart.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function Cart() {
  const { cart, addToCart, removeFromCart, total } = useCart();

  return (
    <section className="container page-center cart-page">
      <h2>Votre panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>

                  <div className="cart-item-qty">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Réduire la quantité de ${item.name}`}
                    >−</button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => addToCart(item)}
                      aria-label={`Augmenter la quantité de ${item.name}`}
                    >+</button>
                  </div>

                  <span className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <strong>Total : ${total.toFixed(2)}</strong>
            <Link to="/checkout">
              <Button className="btn-checkout">Passer à la caisse</Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
