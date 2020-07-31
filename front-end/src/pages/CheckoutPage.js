import React, { useContext } from 'react';
import { ProductsProvider, ProductsContext } from '../contexts/ProductsContext';

const CheckoutPage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      Hello World!
    </div>
  );
};

export default () => (
  <ProductsProvider>
    <CheckoutPage />
  </ProductsProvider>
);
