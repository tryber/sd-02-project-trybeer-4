import React from 'react';
import QuantityHandler from './QuantityHandler';
import { formatPrice } from '../utils';
import '../styles/ProductCard.css';

const ProductCard = ({ name, unitPrice, imageUrl, index }) => (
  <div className="product-card">
    <p data-testid={`${index}-product-price`}>
      {formatPrice(unitPrice)}
    </p>
    <img
      data-testid={`${index}-product-img`}
      src={imageUrl}
      alt={name}
    >
    </img>
    <p data-testid={`${index}-product-name`}>
      {name}
    </p>
    <QuantityHandler index={index} />
  </div>
);

export default ProductCard;
