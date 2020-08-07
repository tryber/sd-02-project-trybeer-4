import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const RegisterInputs = () => {
  const { name, setName, password, setPassword, email, setEmail } = useContext(UserContext);

  return (
    <section className="signup-inputs-section">
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        required
        data-testid="signup-name"
        value={name}
        onChange={({ target: { value } }) => setName(value.toUpperCase())}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        required
        data-testid="signup-email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value.toLowerCase())}
      />
      <label htmlFor="password">Senha</label>
      <input
        id="password"
        type="password"
        required
        data-testid="signup-password"
        value={password}
        onChange={(({ target: { value } }) => setPassword(value))}
      />
    </section>
  );
};

export default RegisterInputs;
