// src/pages/Shop.jsx

import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FacetFilter from '../components/FacetFilter';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

export default function Shop() {
  const options = {
    category: [...new Set(productsData.map(p => p.category))],
    size:     [...new Set(productsData.flatMap(p => p.size))],
    color:    [...new Set(productsData.flatMap(p => p.color))],
    material: [...new Set(productsData.map(p => p.material))]
  };
  const [filters, setFilters] = useState({
    category: [], size: [], color: [], material: []
  });
  const handleFilterChange = (key, val) => {
    if (key === 'reset') {
      setFilters({ category: [], size: [], color: [], material: [] });
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key].includes(val)
          ? prev[key].filter(x => x !== val)
          : [...prev[key], val]
      }));
    }
  };
  const filtered = useMemo(() =>
    productsData.filter(p =>
      (!filters.category.length  || filters.category.includes(p.category)) &&
      (!filters.size.length      || p.size.some(s => filters.size.includes(s))) &&
      (!filters.color.length     || p.color.some(c => filters.color.includes(c))) &&
      (!filters.material.length  || filters.material.includes(p.material))
    )
  , [filters]);

  const { addToCart } = useCart();

return (
    <section className="shop container">
      <h1 className="shop-title">Boutique</h1>

      <div className="shop-layout">
        <aside className="sidebar">
          <FacetFilter
            filters={filters}
            onChange={handleFilterChange}
            options={options}
          />
        </aside>

        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              className="grid-item"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

