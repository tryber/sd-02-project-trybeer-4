import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext, UserProvider } from '../contexts/UserContext';
import LoginInputs from '../components/LoginInputs';
import requestAPI from '../services/backEndAPI';
import LoginButtons from '../components/LoginButtons';
import '../styles/LoginPage.css';

function clearInputs(setEmail, setPassword) {
  setEmail('');
  setPassword('');
}

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

async function submitForm(event, body, history, setErrorMessage) {
  event.preventDefault();
  try {
    const { data } = await requestAPI('POST', '/users/login', body);
    localStorage.setItem('user', JSON.stringify(data));
    const path = getURL(data.role);
    return history.push(path);
  } catch (error) {
    if (!error.response) return setErrorMessage('Erro de conexão com a API');
    return setErrorMessage(error.response.data.error.message);
  }
}

function LoginPage() {
  const { email, setEmail, password, setPassword, setErrorMessage } = useContext(UserContext);
  const history = useHistory();

  const body = { email, password };
  const handleSubmit = (event) => submitForm(event, body, history, setErrorMessage);

  useEffect(
    () => () => clearInputs(setEmail, setPassword),
    [setEmail, setPassword],
  );

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <LoginInputs />
      <LoginButtons />
    </form>
  );
}

export default () => (
  <UserProvider>
    <LoginPage />
  </UserProvider>
);
