import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoginInputs from '../components/LoginInputs';
import LoginButton from '../components/LoginButton';
import { LoginContext, LoginProvider } from '../contexts/LoginContext';
import '../styles/LoginPage.css';
import requestAPI from '../services/backEndAPI';
import { Redirect } from 'react-router-dom';

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

function LoginPage() {
  const { email, setEmail, password, setPassword, errorMessage, setErrorMessage } = useContext(LoginContext);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  // const [redirectTo, setRedirectTo] = useState('');
  const [redirect, setRedirect] = useState({ shouldRedirect: false, to: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //const response = await axios.post(process.env.REACT_APP_URL_LOGIN, { email, password });
      const { data } = await requestAPI('POST', '/users/login', { email, password });
      //const mockUserInfo = { name: 'tryber', email: 'root@email.com', role: 'admin', token: response.data.token };
      localStorage.setItem('user', JSON.stringify(data));
      const path = getURL(data.role);
      setRedirect({ shouldRedirect: true, to: path });
      // setRedirectTo(path);
      // setShouldRedirect(true);
    } catch (error) {    
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  useEffect(() => (
    () => {
      setEmail('');
      setPassword('');
    }
  ), [setEmail, setPassword]);

  if (redirect.shouldRedirect) {
    //setShouldRedirect(false);
    return <Redirect to={redirect.to} />
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <LoginInputs />
      <LoginButton />
    </form>
  );
}

// LoginPage.propTypes = {
//   history: PropTypes.instanceOf(Object).isRequired,
// };

export default () => (
  <LoginProvider>
    <LoginPage />
  </LoginProvider>
);
