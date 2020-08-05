import React, { useContext } from 'react';
import { ProductsProvider, ProductsContext } from '../contexts/ProductsContext';
import Header from '../components/Header';
import CheckoutProducts from '../components/CheckoutProducts';
import CheckoutInputs from '../components/CheckoutInputs';
import CheckoutButton from '../components/CheckoutButton';

const CheckoutPage = () => {
  const { products, quantities } = useContext(ProductsContext);

  return (
    <div>
      <Header title="Finalizar Pedidos" />
      <CheckoutProducts />
      <CheckoutInputs />
      <CheckoutButton />
    </div>
  );
};

export default () => (
  <ProductsProvider>
    <CheckoutPage />
  </ProductsProvider>
);
