import React, { useContext } from 'react';
import { AppContext } from '../context';

function NameInput() {
  const { name, setName } = useContext(AppContext);

  return (
    <>
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="setName"
        type="text"
        required
        data-testid="signup-name"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
    </>
  );
}

function EmailInput() {
  const { email, setEmail } = useContext(AppContext);

  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="setEmail"
        type="email"
        required
        data-testid="signup-email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
    </>
  );
}

function PasswordInput() {
  const { password, setPassword } = useContext(AppContext);

  return (
    <>
      <label htmlFor="password">Senha</label>
      <input
        id="password"
        name="setPassword"
        type="password"
        required
        data-testid="signup-password"
        value={password}
        onChange={(({ target: { value } }) => setPassword(value))}
      />
    </>
  );
}

const RegisterInputs = () => (
  <section className="signup-inputs-section">
    <NameInput />
    <EmailInput />
    <PasswordInput />
  </section>
);

export default RegisterInputs;
