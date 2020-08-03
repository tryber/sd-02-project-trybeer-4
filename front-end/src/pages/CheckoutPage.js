import React, { useContext } from 'react';
import { ProductsProvider, ProductsContext } from '../contexts/ProductsContext';
import CheckoutProducts from '../components/CheckoutProducts';

const CheckoutPage = () => {
  const { products, quantities } = useContext(ProductsContext);

  return (
    <div>
      <CheckoutProducts />
    </div>
  );
};

export default () => (
  <ProductsProvider>
    <CheckoutPage />
  </ProductsProvider>
);
