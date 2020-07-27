import React from 'react';
import { ProductsProvider } from './contexts/ProductsContext';
import Products from './pages/Products';

const App = () => {
  return (
    <div>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </div>
  );
};

export default App;
