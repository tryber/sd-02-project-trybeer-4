import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductCardContext';
import '../styles/QuantityHandler.css';

const QuantityHandler = ({ index }) => {
  const { quantity, addOne, subtractOne } = useContext(ProductContext);

  return (
    <div className="quantity-handler">
      <button
        data-testid={`${index}-product-minus`}
        onClick={subtractOne}
        disabled={quantity === 0}
      >
        -
      </button>
      <p data-testid={`${index}-product-qtd`}>
        {quantity}
      </p>
      <button
        data-testid={`${index}-product-plus`}
        onClick={addOne}
      >
        +
      </button>
    </div>
  );
};

export default QuantityHandler;
