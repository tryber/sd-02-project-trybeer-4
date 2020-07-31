import React, { useContext } from 'react';
import { UserProvider, UserContext } from '../contexts/UserContext';
import requestAPI from '../services/backEndAPI';
import UpdateUserBtn from '../components/UpdateUserBtn';
import ClientProfileInputs from '../components/ClientProfileInputs';
import '../styles/ProfilePage.css';

function ClientProfile() {
  const { name, setErrorMessage, setName } = useContext(UserContext);
  const { token } = JSON.parse(localStorage.getItem('user'));

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    try {
      const { data } = await requestAPI('PATCH', '/users/me', { name }, token);
      localStorage.setItem('user', JSON.stringify(data));
      return setName(data.name);
    } catch (error) {
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="client-profile-form">
      <ClientProfileInputs />
      <UpdateUserBtn />
    </form>
  );
}

export default () => (
  <UserProvider>
    <ClientProfile />
  </UserProvider>
);
