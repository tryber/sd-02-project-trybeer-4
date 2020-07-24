import React from 'react';
import LoginInputs from '../components/LoginInputs';
import LoginButton from '../components/LoginButton';

function LoginPage() {
  return (
    <form className="login-form">
      <LoginInputs />
      <LoginButton />
    </form>
  );
}

export default LoginPage;
