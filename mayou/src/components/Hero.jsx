// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Nouvelle collection</h1>
        <Link to="/shop">
          <Button className="hero-cta">Découvrir</Button>
        </Link>
      </div>
    </section>
  );
}
