import React, { createContext, useState } from 'react';
import requestAPI from '../services/backEndAPI';

const handleLocalStorage = (products, quantities) => {
  if (products && products.length > 0) {
    const storedProducts = products.map(({ id, name, unitPrice }, i) => ({
      id,
      name,
      unitPrice,
      quantity: quantities[i] || 0,
    }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }
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
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const storeQuantities = (quantities) => handleLocalStorage(products, quantities);

  const loadProducts = async () => 
    handleProducts(products, setProducts, setQuantities, setRedirect);

  const increaseQuantity = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, true);

  const decreaseQuantity = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, false);

  const context = {
    products,
    loadProducts,
    quantities,
    increaseQuantity,
    decreaseQuantity,
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
