// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const featured = productsData.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="section-featured container">
        <h2 className="featured-title">
          Tendances du <span className="accent">moment</span>
        </h2>

        <div className="featured-grid">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
