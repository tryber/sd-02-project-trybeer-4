import React from 'react';
import QuantityHandler from './QuantityHandler';
import { formatPrice } from '../utils';
import '../styles/ProductCard.css';

const ProductCard = ({ name, unitPrice, imageUrl, index }) => (
  <div className="product-card">
    <h2
      data-testid={`${index}-product-price`}
    >
      {formatPrice(unitPrice)}
    </h2>
    <img
      data-testid={`${index}-product-img`}
      src={imageUrl}
      alt={name}
    >
    </img>
    <h2
      data-testid={`${index}-product-name`}
    >
      {name}
    </h2>
    <QuantityHandler index={index} />
  </div>
);

export default ProductCard;
