import React, { useContext } from 'react';
import { AppContext } from '../context';

const LoginInputs = () => {
  const { email, password, setEmail, setPassword } = useContext(AppContext);

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
