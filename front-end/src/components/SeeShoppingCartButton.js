import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice } from '../utils';
import '../styles/SeeShoppingCartButton.css';

const calculateTotalPrice = (products, quantities) =>
  products.reduce(
    (acc, { unitPrice }, i) => acc + (unitPrice * quantities[i]),
    0,
  );

const SeeShoppingCartButton = () => {
  const { products, quantities } = useContext(ProductsContext);
  const totalPrice = calculateTotalPrice(products, quantities);

  return (
    <div className="see-shopping-cart-button">
      <a href="/checkout">
        <button
          data-testid="checkout-bottom-btn"
        >
          <div className="button-content">
            <div>Ver carrinho</div>
            <div data-testid="checkout-bottom-btn-value">
              {formatPrice(totalPrice)}
            </div>
          </div>
        </button>
      </a>
    </div>
  );
};

export default SeeShoppingCartButton;
