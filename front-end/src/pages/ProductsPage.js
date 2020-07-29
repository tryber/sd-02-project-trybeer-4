import React, { useContext, useEffect } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import { Redirect } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';
import '../styles/ProductsPage.css';

const renderElements = (products) => (
  <div>
    <div className="all-cards">
      {products.map(({ name, unitPrice, imageUrl }, index) =>
        <ProductCard
          index={index}
          data={{ name, unitPrice, imageUrl }}
        />
      )}
    </div>
    <div className="empty-div" />
    <SeeShoppingCartButton />
  </div>
);

const ProductsPage = () => {
  const {
    products,
    loadProducts,
    quantities,
    storeQuantities,
    redirect,
  } = useContext(ProductsContext);

  useEffect(
    () => {
      loadProducts();
      storeQuantities(quantities);
    },
    [loadProducts, storeQuantities, quantities],
  );

  if (redirect) return <Redirect to="/login" />;

  return renderElements(products);
};

export default () => (
  <ProductsProvider>
    <ProductsPage />
  </ProductsProvider>
);
