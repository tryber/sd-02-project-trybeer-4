import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginInputs from '../components/LoginInputs';
import LoginButton from '../components/LoginButton';
import { AppContext } from '../context';
import '../css/loginPage.css';

function LoginPage(props) {
  const { email, password, errorMessage, setErrorMessage } = useContext(AppContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const URL = 'http://localhost:3001/users/login';
      const response = await axios.post(URL, { email, password });
      const mockUserInfo = { name: 'tryber', email: 'root@email.com', role: 'administrador', token: response.data.token };
      localStorage.setItem('user', JSON.stringify(mockUserInfo));
      return mockUserInfo.role === 'administrador' ? props.history.push('/admin/orders') : props.history.push('/admin/products');
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
