// src/components/ProductCard.jsx

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Button from './Button';

function ProductCard({ product, onAdd, className = '' }) {
  const handleAdd = useCallback(() => {
    onAdd(product);
    toast.success(`"${product.name}" ajouté au panier !`);
  }, [onAdd, product]);

  const hasDiscount = Boolean(product.discount);
  const finalPrice = hasDiscount
    ? (product.price * (1 - product.discount)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className={`card product-card ${className}`}>
      <div className="product-card-image-wrapper">
        {hasDiscount && (
          <span className="badge discount">
            -{Math.round(product.discount * 100)}%
          </span>
        )}
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="card-content">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">
          {hasDiscount && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
          <span className="final-price">${finalPrice}</span>
        </p>
        <Button onClick={handleAdd} className="btn-card">
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id:       PropTypes.number.isRequired,
    name:     PropTypes.string.isRequired,
    price:    PropTypes.number.isRequired,
    image:    PropTypes.string.isRequired,
    discount: PropTypes.number, // 0.15 for 15%
  }).isRequired,
  onAdd:    PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default memo(ProductCard);
