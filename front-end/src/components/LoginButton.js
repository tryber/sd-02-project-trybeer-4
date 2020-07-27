import React, { useContext } from 'react';
import axios from 'axios';
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

async function handleSubmit({ email, password }) {
  const URL = '';
  const response = await axios.post(URL, { email, password });
  const result = await response
    .then(({ token, username, role }) => ({ token, username, role }))
    .catch((e) => console.error(e));
  const mockResponseAdmin = { token: 'abc123', username: 'joazinho', role: 'administrador' };
}

const LoginButton = () => {
  const { email, password } = useContext(AppContext);
  const validLogin = loginValidation({ email, password });

  return (
    <section>
      {validLogin === false
        && <div>Digite uma email válido e uma senha númerica de pelo menos 6 caracteres</div>}
      <button
        type="button"
        className="login-btn"
        data-testid="login-btn"
        disabled={!validLogin}
        onSubmit={() => handleSubmit({ email, password })}
      >
        ENTRAR
      </button>
    </section>
  );
};

export default LoginButton;
