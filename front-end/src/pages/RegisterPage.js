import React from 'react';
import RegisterInputs from '../components/RegisterInputs';
import RegisterCheckbox from '../components/RegisterCheckbox';
import RegisterButton from '../components/RegisterButton';

function RegisterPage() {

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }
  console.log('teste')
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <RegisterInputs />
      <RegisterCheckbox />
      <RegisterButton />
    </form>
  );
}

export default RegisterPage;
