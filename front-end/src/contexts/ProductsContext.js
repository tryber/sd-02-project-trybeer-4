import React, { createContext, useState, useEffect } from 'react';
import requestAPI from '../services/backEndAPI';

const localStorageHandler = (products, quantities) => {
  if (products && products.length > 0) {
    const storedProducts = products.map(({ id }, i) => ({ id, quantity: quantities[i] }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }
};

const getInitialQuantities = (products) => {
  let storedProducts = JSON.parse(localStorage.getItem('products'));

  if (!storedProducts || storedProducts.length === 0) {
    storedProducts = products.map(({ id }) => ({ id, quantity: 0 }));
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }

  return storedProducts.map(({ quantity }) => quantity);
};

const getProductsFromAPI =  async (setProducts, setQuantities, setRedirect) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    const { data: products } = await requestAPI('GET', '/products', null, token);
    const quantities = getInitialQuantities(products);
    setProducts(products);
    setQuantities(quantities);
  } catch (e) {
    setRedirect(true);
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

  useEffect(() => {
    localStorageHandler(products, quantities);
  }, [quantities]);

  const loadProducts = async () => {
    await getProductsFromAPI(setProducts, setQuantities, setRedirect);
  };

  const addOne = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, true);

  const subtractOne = (productIndex) =>
    updateQuantities(quantities, setQuantities, productIndex, false);

  const context = {
    products,
    loadProducts,
    quantities,
    addOne,
    subtractOne,
    redirect,
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
