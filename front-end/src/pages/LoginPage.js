import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginInputs from '../components/LoginInputs';
import LoginButton from '../components/LoginButton';
import { AppContext } from '../context';
import '../css/loginPage.css';

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

function LoginPage(props) {
  const { email, password, errorMessage, setErrorMessage } = useContext(AppContext);
  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    try {
      const response = await axios.post(process.env.REACT_APP_URL_LOGIN, { email, password });
      const mockUserInfo = { name: 'tryber', email: 'root@email.com', role: 'admin', token: response.data.token };
      localStorage.setItem('user', JSON.stringify(mockUserInfo));
      const path = getURL(mockUserInfo.role);
      return props.history.push(path);
    } catch (error) {
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  useEffect(() => {
    if (errorMessage) props.history.push('login');
  }, [errorMessage]);

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <LoginInputs />
      <LoginButton />
    </form>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
