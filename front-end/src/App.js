import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './components/PrivateRoute';
import ClientProfile from './pages/ClientProfile';
import AdminProfile from './pages/AdminProfile';
import MyOrdersPage from './pages/MyOrdersPage';
import ClientOrderDetails from './pages/ClientOrderDetails';
import AdminOrders from './pages/AdminOrders';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <PrivateRoute path="/products" component={ProductsPage} />
      <PrivateRoute path="/checkout" component={CheckoutPage} />
      <PrivateRoute path="/profile" component={ClientProfile} />
      <PrivateRoute path ="/admin/profile" component={AdminProfile} />
      <PrivateRoute exact path="/orders" component={MyOrdersPage} />
      <PrivateRoute path="/orders/:id" component={ClientOrderDetails} />
      <PrivateRoute exact path="/admin/orders" component={AdminOrders} />
    </Switch>
  </BrowserRouter>
);

export default App;
