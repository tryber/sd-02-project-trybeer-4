import React from 'react';
import { ProductsProvider } from '../contexts/ProductsContext';
import CheckoutProducts from '../components/CheckoutProducts';
import CheckoutInputs from '../components/CheckoutInputs';
import CheckoutButton from '../components/CheckoutButton';

const CheckoutPage = () => (
  <div>
    <CheckoutProducts />
    <CheckoutInputs />
    <CheckoutButton />
  </div>
);

export default () => (
  <ProductsProvider>
    <CheckoutPage />
  </ProductsProvider>
);
