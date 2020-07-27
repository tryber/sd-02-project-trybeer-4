import React, { createContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0);

  const addOne = () => setQuantity(quantity + 1);
  const subtractOne = () => setQuantity(quantity - 1);

  const context = {
    quantity,
    addOne,
    subtractOne,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
