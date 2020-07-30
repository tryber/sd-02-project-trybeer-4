import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function RegisterCheckbox() {
  const { seller, setSeller } = useContext(UserContext);

  return (
    <section className="register-checkbox-section">
      <input
        type="checkbox"
        id="register-checkbox"
        onChange={() => setSeller(!seller)}
        data-testid="signup-seller"
      />
      <label htmlFor="register-checkbox">Quero vender</label>
    </section>
  );
}

export default RegisterCheckbox;
