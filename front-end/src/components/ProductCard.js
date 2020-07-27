import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../contexts/ProductCardContext';
import QuantityHandler from './QuantityHandler';
//import '../styles/ProductCard.css';

const formatPrice = (price) => price.toLocaleString(
  'pt-BR',
  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' },
);

const localStorageHandler = (id, quantity) => {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const thisProductIndex = products.indexOf(products.find((product) => product.id === id));

  if (thisProductIndex === -1) {
    products.push({ id, quantity });
  } else {
    products[thisProductIndex] = { id, quantity };
  }

  const newProducts = products.filter((product) => product.quantity > 0);

  localStorage.setItem('products', JSON.stringify(newProducts));
};

const ProductCard = ({ id, name, unitPrice, imageUrl, index = 0 }) => {
  const { quantity } = useContext(ProductContext);

  useEffect(
    () => localStorageHandler(id, quantity),
    [quantity],
  );

  return (
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
      <QuantityHandler index={0} />
    </div>
  );
};

export default ProductCard;
