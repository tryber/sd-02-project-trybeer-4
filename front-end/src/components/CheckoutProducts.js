import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

const CheckoutProducts = () => {
  const { products } = useContext(ProductsContext);

  return (
    <section>
      <h2>Produtos</h2>
    </section>
  );
};

export default CheckoutProducts;
