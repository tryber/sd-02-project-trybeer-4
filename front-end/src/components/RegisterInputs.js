import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function NameInput() {
  const { name, setName } = useContext(UserContext);

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
  const { email, setEmail } = useContext(UserContext);

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
  const { password, setPassword } = useContext(UserContext);

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
