import React, { useContext } from 'react';
import { UserProvider, UserContext } from '../contexts/UserContext';
import requestAPI from '../services/backEndAPI';
import UpdateUserBtn from '../components/UpdateUserBtn';
import '../styles/ProfilePage.css';

function ClientProfile() {
  const { name: contextName, setName, setErrorMessage } = useContext(UserContext);
  const { name, email, token } = JSON.parse(localStorage.getItem('user'));

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    try {
      const { data } = await requestAPI('PATCH', '/users/me', { name: contextName }, token);
      return localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      if (!error.response) return setErrorMessage('Erro de conexão com a API');
      return setErrorMessage(error.response.data.error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="client-profile-form">
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        required
        data-testid="profile-name-input"
        value={contextName || name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        data-testid="profile-email-input"
        value={email}
        readOnly
      />
      <UpdateUserBtn />
    </form>
  );
}

export default () => (
  <UserProvider>
    <ClientProfile />
  </UserProvider>
);
