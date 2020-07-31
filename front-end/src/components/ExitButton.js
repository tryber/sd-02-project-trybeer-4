import React from 'react';
import { useHistory } from 'react-router-dom';

const ExitButton = () => {
  const history = useHistory();

  const exitAndRedirect = () => {
    localStorage.clear();
    return history.push('/login');
  };

  return (
    <div className="ExitButton">
      <button
        type="button"
        className="SideButton"
        onClick={() => exitAndRedirect(history)}
      >
        Sair
      </button>
    </div>
  );
};

export default ExitButton;