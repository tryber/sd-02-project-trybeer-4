import React, { useContext, useEffect } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import { Redirect } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const { products, getProducts, redirect } = useContext(ProductsContext);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  const loadProducts = async () => {
    await getProducts(token);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (redirect) {
    localStorage.clear();
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="all-cards">
        {products.map(({ id, name, unitPrice, imageUrl }, index) =>
          <ProductCard
            id={id}
            name={name}
            unitPrice={unitPrice}
            imageUrl={imageUrl}
            index={index}
          />
        )}
      </div>
      <div className="empty-div" />
      <SeeShoppingCartButton />
    </div>
  );
};

export default () => (
  <ProductsProvider>
    <ProductsPage />
  </ProductsProvider>
);
