import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice, calculateTotalPrice } from '../utils';

const CheckoutProducts = () => {
  const { quantities } = useContext(ProductsContext);

  const productsInShoppingCart = (JSON.parse(localStorage.getItem('products')) || [])
    .map((product, i) => ({
      ...product,
      quantity: quantities[i] || product.quantity,
    }))
    .filter(({ quantity }) => quantity > 0);

console.log(productsInShoppingCart)

  const removeProduct = (id) => localStorage.setItem(
    'products',
    JSON.stringify(
      JSON.parse((localStorage.getItem('products')) || [])
        .map((product) =>
          product.id === id
          ? { ...product, quantity: 0 }
          : product
        )
    )
  );

  return (
    <section>
      <h2>Produtos</h2>
      <div>
        {productsInShoppingCart.map(({ id, quantity, name, unitPrice }, index) => (
          <div>
            <div data-testid={`${index}-product-qtd-input`}>{quantity}</div>
            <div data-testid={`${index}-product-name`}>{name}</div>
            <div data-testid={`${index}-product-total-value`}>
              {formatPrice(quantity * unitPrice)}
            </div>
            <button onClick={() => removeProduct(id)}>X</button>
          </div>
        ))}
      </div>
      <div data-testid="order-total-value">
        {`Total: ${formatPrice(calculateTotalPrice(productsInShoppingCart))}`}
      </div>
    </section>
  );
};

export default CheckoutProducts;
