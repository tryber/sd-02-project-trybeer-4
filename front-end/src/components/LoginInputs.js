import React, { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';

const LoginInputs = () => {
  const { email, password, setEmail, setPassword } = useContext(LoginContext);

  return (
    <section className="login-inputs-section">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="setEmail"
        type="email"
        required
        data-testid="email-input"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <label htmlFor="password">Senha</label>
      <input
        id="password"
        name="setPassword"
        type="password"
        required
        data-testid="password-input"
        value={password}
        onChange={(({ target: { value } }) => setPassword(value))}
      />
    </section>
  );
};

export default LoginInputs;
