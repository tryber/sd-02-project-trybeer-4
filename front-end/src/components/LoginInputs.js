import React, { useContext } from 'react';
import { AppContext } from '../context';

const LoginInputs = () => {
  const { email, password, setEmail, setPassword } = useContext(AppContext);

  return (
    <section className="login-section">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="setEmail"
        type="email"
        required
        onInvalid={() => console.log('lalal')}
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
