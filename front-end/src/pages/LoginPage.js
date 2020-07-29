import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginContext, LoginProvider } from '../contexts/LoginContext';
import LoginInputs from '../components/LoginInputs';
import LoginButton from '../components/LoginButton';
import requestAPI from '../services/backEndAPI';
import '../styles/LoginPage.css';

function clearInputs(setEmail, setPassword) {
  setEmail('');
  setPassword('');
}

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

async function submitForm(event, body, setRedirect, setErrorMessage) {
  event.preventDefault();
  try {
    const { data } = await requestAPI('POST', '/users/login', body);
    localStorage.setItem('user', JSON.stringify(data));
    const path = getURL(data.role);
    setRedirect({ shouldRedirect: true, to: path });
  } catch (error) {    
    if (!error.response) return setErrorMessage('Erro de conexão com a API');
    return setErrorMessage(error.response.data.error.message);
  }
}

function LoginPage() {
  const { email, setEmail, password, setPassword, setErrorMessage } = useContext(LoginContext);
  const [redirect, setRedirect] = useState({ shouldRedirect: false, to: '' });

  const body = { email, password };
  const handleSubmit = (event) => submitForm(event, body, setRedirect, setErrorMessage);

  useEffect(
    () =>
      () => clearInputs(setEmail, setPassword),
    [setEmail, setPassword],
  );

  if (redirect.shouldRedirect) return <Redirect to={redirect.to} />;

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <LoginInputs />
      <LoginButton />
    </form>
  );
}

export default () => (
  <LoginProvider>
    <LoginPage />
  </LoginProvider>
);
