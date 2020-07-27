import React from 'react';
import QuantityHandler from './QuantityHandler';
import { formatPrice } from '../utils';
import '../styles/ProductCard.css';

const ProductCard = ({ name, unitPrice, imageUrl, index }) => (
  <div className="product-card">
    <p
      data-testid={`${index}-product-price`}
      className="unit-price"
    >
      {formatPrice(unitPrice)}
    </p>
    <div className="product-image">
      <img
        data-testid={`${index}-product-img`}
        src={imageUrl}
        alt={name}
      >
      </img>
    </div>
    <p
      data-testid={`${index}-product-name`}
      className="product-name"
    >
      {name}
    </p>
    <QuantityHandler index={index} />
  </div>
);

export default ProductCard;
