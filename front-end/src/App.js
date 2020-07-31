import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import PrivateRoute from './PrivateRoute';
import CheckoutPage from './pages/CheckoutPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <PrivateRoute path="/products" component={ProductsPage} />
      <PrivateRoute path="/checkout" component={CheckoutPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
