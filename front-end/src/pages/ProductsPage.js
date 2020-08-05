import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';
import Header from '../components/Header';
import '../styles/ProductsPage.css';

const renderElements = (products) => (
  <div>
    <Header title="TryBeer" />
    <div className="all-cards">
      {products.map(({ name, unitPrice, imageUrl }, index) => (
        <ProductCard
          index={index}
          data={{ name, unitPrice, imageUrl }}
        />
      ))}
    </div>
    <div className="empty-div" />
    <SeeShoppingCartButton />
  </div>
);

const ProductsPage = () => {
  const {
    products,
    loadProducts,
    redirect,
  } = useContext(ProductsContext);

  useEffect(
    () => {
      loadProducts();
    },
    [loadProducts],
  );

  if (redirect) return <Redirect to="/login" />;

  return renderElements(products);
};

export default () => (
  <ProductsProvider>
    <ProductsPage />
  </ProductsProvider>
);
