import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

function ClientProfileInputs() {
  const { name: contextName, setName } = useContext(UserContext);
  const { name, email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!contextName) setName(name);
  }, [contextName, setName, name]);

  return (
    <>
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        required
        data-testid="profile-name-input"
        value={contextName}
        onChange={({ target: { value } }) => setName(value.toUpperCase())}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        data-testid="profile-email-input"
        value={email}
        readOnly
      />
    </>
  );
}

export default ClientProfileInputs;
