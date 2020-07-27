import React, { createContext, useState, useEffect } from 'react';
import productsMock from '../mocks/productsMock';

const getInitialQuantities = (products) => {
  let storedProducts = JSON.parse(localStorage.getItem('products'));

  if (!storedProducts) {
    storedProducts = products.map(({ id }) => ({ id, quantity: 0 }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }

  return storedProducts.map(({ quantity }) => quantity);
};

const localStorageHandler = (products, quantities) => {
  const storedProducts = products.map(({ id }, i) => ({ id, quantity: quantities[i] }));
  localStorage.setItem('products', JSON.stringify(storedProducts));
};

const updateQuantities = (quantities, setQuantities, productIndex, shouldAdd) => {
  const newQuantities = quantities.map((quantity, i) => {
    if (i === productIndex) {
      return shouldAdd ? quantity + 1 : quantity - 1;
    }
    return quantity;
  });
  setQuantities(newQuantities);
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(productsMock) //Provavelmente mudar essa linha

  const initialQuantities = getInitialQuantities(products);
  const [quantities, setQuantities] = useState(initialQuantities);

  useEffect(
    () => localStorageHandler(products, quantities),
    [quantities],
  );

  const addOne = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, true);

  const subtractOne = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, false);

  const context = {
    products,
    quantities,
    addOne,
    subtractOne,
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
