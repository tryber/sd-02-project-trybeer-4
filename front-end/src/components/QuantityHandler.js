import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import '../styles/QuantityHandler.css';

const QuantityHandler = ({ index }) => {
  const { quantities, addOne, subtractOne } = useContext(ProductsContext);
  const quantity = quantities[index];

  return (
    <div className="quantity-handler">
      <button
        data-testid={`${index}-product-minus`}
        onClick={() => subtractOne(index)}
        disabled={quantity === 0}
      >
        -
      </button>
      <p data-testid={`${index}-product-qtd`}>
        {quantity}
      </p>
      <button
        data-testid={`${index}-product-plus`}
        onClick={() => addOne(index)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityHandler;
