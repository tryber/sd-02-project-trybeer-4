import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { nameValidation } from '../utils/fieldsValidation';

const UpdateUserBtn = () => {
  const { name, errorMessage } = useContext(UserContext);
  const validName = nameValidation(name);
  return (
    <section className="login-btn-section">
      {validName === false && <div>Seu nome deve contar ao menos 12 letras</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        type="submit"
        className="profile-save-btn"
        data-testid="profile-save-btn"
        disabled={!validName}
      >
        SALVAR
      </button>
    </section>
  );
};

export default UpdateUserBtn;
