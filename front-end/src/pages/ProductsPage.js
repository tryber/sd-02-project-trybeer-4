import React, { useContext, useEffect } from 'react';
import { ProductsContext, ProductsProvider } from '../contexts/ProductsContext';
import { Redirect } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';
import '../styles/ProductsPage.css';

const renderElements = (products) => (
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

const ProductsPage = () => {
  const { products, loadProducts, redirect } = useContext(ProductsContext);

  useEffect(() => {
    loadProducts();
  }, []);

  if (redirect) {
    localStorage.clear();
    return <Redirect to="/login" />
  }

  return renderElements(products);
};

export default () => (
  <ProductsProvider>
    <ProductsPage />
  </ProductsProvider>
);
