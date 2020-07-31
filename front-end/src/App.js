import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/products" component={ProductsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
