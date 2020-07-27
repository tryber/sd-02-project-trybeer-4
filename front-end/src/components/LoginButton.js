import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';

function loginValidation({ email, password }) {
  if (!password || !email) return null;
  const mailRegex = /[a-z-]+@[a-z-]+/;
  const passwordRegex = /^\d+$/;
  const validPass = password && passwordRegex.test(password) && password.length >= 6;
  const validEmail = email && mailRegex.test(email);
  if (!validPass || !validEmail) return false;
  return true;
}

const LoginButton = () => {
  const { email, password, errorMessage } = useContext(AppContext);
  const validLogin = loginValidation({ email, password });

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
      <Link to="/register">
        <button
          type="button"
          className="no-account-btn"
          data-testid="no-account-btn"
        >
          Ainda não tenho conta
        </button>
      </Link>
    </section>
  );
};

export default LoginButton;
