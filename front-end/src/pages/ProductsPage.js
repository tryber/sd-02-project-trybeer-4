import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const { products } = useContext(ProductsContext);

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

export default ProductsPage;
