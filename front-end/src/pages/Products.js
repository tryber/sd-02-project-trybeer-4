import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import ProductCard from '../components/ProductCard';
import SeeShoppingCartButton from '../components/SeeShoppingCartButton';

const Products = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      <div>
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
      <SeeShoppingCartButton />
    </div>
  );
};

export default Products;
