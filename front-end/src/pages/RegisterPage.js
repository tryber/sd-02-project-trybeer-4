import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RegisterInputs from '../components/RegisterInputs';
import RegisterCheckbox from '../components/RegisterCheckbox';
import RegisterButton from '../components/RegisterButton';
import requestAPI from '../services/backEndAPI';
import { UserContext } from '../contexts/UserContext';

function getURL(role) {
  if (role === 'admin') return '/admin/orders';
  return '/products';
}

function RegisterPage(props) {
  const { name, email, password, setErrorMessage, role } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    try {
      const response = await requestAPI('POST', '/users', { name, email, password, role });
      const mockUserInfo = { name: 'tryber', email: 'root@email.com', role, token: response.data.token };
      localStorage.setItem('user', JSON.stringify(mockUserInfo));
      const path = getURL(role);
      return props.history.push(path);
    } catch (error) {
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <RegisterInputs />
      <RegisterCheckbox />
      <RegisterButton />
    </form>
  );
}

export default RegisterPage;

RegisterPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
