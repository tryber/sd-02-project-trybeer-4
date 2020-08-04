import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { nameValidation } from '../utils/fieldsValidation';

const UpdateUserBtn = () => {
  const { name, errorMessage } = useContext(UserContext);
  const { name: currentName } = JSON.parse(localStorage.getItem('user'));
  const validName = nameValidation(name);
  const formattedName = name
    .trim()
    .split(' ')
    .filter((substr) => substr !== '')
    .join(' ')
    .toUpperCase();
  return (
    <section className="login-btn-section">
      {validName === false && <div>Seu nome deve contar ao menos 12 letras</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        type="submit"
        className="profile-save-btn"
        data-testid="profile-save-btn"
        disabled={!validName || currentName === formattedName}
      >
        SALVAR
      </button>
    </section>
  );
};

export default UpdateUserBtn;
