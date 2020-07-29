import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { passwordValidation, emailValidation } from '../utils/fieldsValidation';

const CreateAccountBtn = () => {
  const { setEmail, setPassword } = useContext(UserContext);
  return (
    <Link to="/register">
      <button
        type="button"
        className="no-account-btn"
        data-testid="no-account-btn"
        onClick={() => {
          setEmail('');
          setPassword('');
        }}
      >
        Ainda não tenho conta
      </button>
    </Link>
  );
};

const LoginButtons = () => {
  const { email, password, errorMessage } = useContext(UserContext);
  const validLogin = emailValidation(email) && passwordValidation(password);
  return (
    <section className="login-btn-section">
      {validLogin === false
        && <div>Digite uma email válido e uma senha númerica de pelo menos 6 caracteres</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        type="submit"
        className="signin-btn"
        data-testid="signin-btn"
        disabled={!validLogin}
      >
        ENTRAR
      </button>
      <CreateAccountBtn />
    </section>
  );
};

export default LoginButtons;
