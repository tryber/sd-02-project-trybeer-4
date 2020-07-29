import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import '../styles/QuantityHandler.css';

const QuantityHandler = ({ index }) => {
  const { quantities, increaseQuantity, decreaseQuantity } = useContext(ProductsContext);

  const quantity = quantities[index];
  const disabled = quantity === 0;

  const addOne = () => increaseQuantity(index);
  const subtractOne = () => decreaseQuantity(index);

  return (
    <div className="quantity-handler">
      <button
        data-testid={`${index}-product-minus`}
        disabled={disabled}
        onClick={subtractOne}
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
