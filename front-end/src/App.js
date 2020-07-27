import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <ProductsProvider>
            <Route path="/products" component={ProductsPage} />
          </ProductsProvider>
        </Switch>
      </BrowserRouter>
  );
};

export default App;
