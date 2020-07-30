import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterInputs from '../components/RegisterInputs';
import RegisterCheckbox from '../components/RegisterCheckbox';
import RegisterButton from '../components/RegisterButton';
import requestAPI from '../services/backEndAPI';
import { UserContext, UserProvider } from '../contexts/UserContext';
import '../styles/RegisterPage.css';

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

function RegisterPage() {
  const {
    name, email, password, setErrorMessage, role, setEmail, setPassword, setName,
  } = useContext(UserContext);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    try {
      const { data } = await requestAPI('POST', '/users', { name, email, password, role });
      localStorage.setItem('user', JSON.stringify(data));
      const path = getURL(role);
      return history.push(path);
    } catch (error) {
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  useEffect(
    () => () => {
      setName('');
      setPassword('');
      setEmail('');
    },
    [setEmail, setPassword, setName],
  );

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <RegisterInputs />
      <RegisterCheckbox />
      <RegisterButton />
    </form>
  );
}

export default () => (
  <UserProvider>
    <RegisterPage />
  </UserProvider>
);
