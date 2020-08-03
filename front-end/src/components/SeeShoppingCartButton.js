import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice, calculateTotalPrice } from '../utils';
import '../styles/SeeShoppingCartButton.css';

const SeeShoppingCartButton = () => {
  const { quantities } = useContext(ProductsContext);

  const products = (JSON.parse(localStorage.getItem('products')) || [])
    .map((product, i) => ({
      ...product,
      quantity: quantities[i],
    }));

  return quantities.length > 0 ?(
    <div className="see-shopping-cart-button">
      <a href="/checkout">
        <button
          data-testid="checkout-bottom-btn"
        >
          <div className="button-content">
            <div>Ver carrinho</div>
            <div data-testid="checkout-bottom-btn-value">
              {formatPrice(calculateTotalPrice(products))}
            </div>
          </div>
        </button>
      </a>
    </div>
  ) : null;
};

export default SeeShoppingCartButton;
