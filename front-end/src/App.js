import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProductsProvider>
            <Route path="/products" component={ProductsPage} />
          </ProductsProvider>
        </Switch>
      </BrowserRouter>
  );
};

export default App;
