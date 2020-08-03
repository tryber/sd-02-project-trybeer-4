import React, { createContext, useState, useEffect } from 'react';
import requestAPI from '../services/backEndAPI';

const handleLocalStorage = (products, quantities) => {
  // if (products && products.length > 0) {
  const storedProducts = (JSON.parse(localStorage.getItem('products')) || [])
    .map(({ id, name, unitPrice }, i) => ({
      id,
      name,
      unitPrice,
      quantity: quantities[i] || 0,
    }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  // }
};

const getInitialQuantities = (products) => {
  let storedProducts = JSON.parse(localStorage.getItem('products'));

  if (!storedProducts || storedProducts.length === 0) {
    storedProducts = products.map(({ id, name, unitPrice }) => ({
      id,
      name,
      unitPrice,
      quantity: 0,
    }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }

  return storedProducts.map(({ quantity }) => quantity);
};

const handleProducts =  async (products, setProducts, setQuantities, setRedirect) => {
  if (!products || products.length === 0) {
    try {
      const { token } = JSON.parse(localStorage.getItem('user')) || {};
      const { data: products } = await requestAPI('GET', '/products', null, token);
      const quantities = getInitialQuantities(products);
      setProducts(products);
      setQuantities(quantities);
    } catch (e) {
      setRedirect(true);
    }
  }
};

const updateQuantities = (quantities, setQuantities, productIndex, operation) => {
  const newQuantities = quantities.map((quantity, i) => {
    if (i === productIndex) {
      switch (operation) {
        case 'increase': return quantity + 1;
        case 'decrease': return quantity - 1;
        case 'reset': return 0;
        default: return quantity;
      }
    }
    return quantity;
  });
  setQuantities(newQuantities);
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(getInitialQuantities(products));
  const [redirect, setRedirect] = useState(false);

  const storeQuantities = (quantities) => handleLocalStorage(products, quantities);

  const loadProducts = async () => 
    handleProducts(products, setProducts, setQuantities, setRedirect);

  const increaseQuantity = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, 'increase');

  const decreaseQuantity = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, 'decrease');

  const resetQuantity = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, 'reset');

  useEffect(
    () => {
      storeQuantities(quantities);
    },
    [storeQuantities, quantities],
  );

  const context = {
    products,
    loadProducts,
    quantities,
    increaseQuantity,
    decreaseQuantity,
    resetQuantity,
    storeQuantities,
    redirect,
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
