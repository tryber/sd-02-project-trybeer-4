import React, { useContext } from 'react';
import { AppContext } from '../context';
import { emailValidation, passwordValidation, nameValidation } from '../utils/fieldsValidation';

function RegisterButton() {
  const { name, email, password, errorMessage } = useContext(AppContext);
  const validRegister = emailValidation(email)
    && passwordValidation(password)
    && nameValidation(name);
  return (
    <section className="register-btn-section">
      {validRegister === false
        && (
          <div>
            Digite um email válido e uma senha númerica de pelo menos 6 caracteres.
            <br />
            Seu nome deve conter, ao menos, 12 letras.
          </div>
        )}
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit" className="signup-btn" data-testid="signup-btn" disabled={!validRegister}>
        CADASTRAR
      </button>
    </section>
  );
}

export default RegisterButton;
