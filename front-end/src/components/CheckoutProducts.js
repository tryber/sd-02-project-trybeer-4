import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice, calculateTotalPrice } from '../utils';
import '../styles/CheckoutProducts.css';

const CheckoutProducts = () => {
  const { quantities, resetQuantity } = useContext(ProductsContext);

  const productsInShoppingCart = (JSON.parse(localStorage.getItem('products')) || [])
    .map((product, i) => ({
      ...product,
      quantity: quantities[i],
    }))
    .filter(({ quantity }) => quantity > 0);

  return (
    <section>
      <h2>Produtos</h2>
      <div>
        {productsInShoppingCart.map(({ id, quantity, name, unitPrice }, index) => (
          <div className="checkout-product-card">
            <div data-testid={`${index}-product-qtd-input`}>{quantity}</div>
            <div data-testid={`${index}-product-name`}>{name}</div>
            <div data-testid={`${index}-product-total-value`}>
              {formatPrice(quantity * unitPrice)}
            </div>
            <button onClick={() => resetQuantity(id - 1)}>X</button>
          </div>
        ))}
      </div>
      <div data-testid="order-total-value" className="checkout-total-price">
        {`Total: ${formatPrice(calculateTotalPrice(productsInShoppingCart))}`}
      </div>
    </section>
  );
};

export default CheckoutProducts;
