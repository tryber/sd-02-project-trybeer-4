import React  from 'react';
import '../styles/Header.css';

const Header = ({title}) => {
  return (
    <div className="container">
      <button>
        <img data-testid="top-hamburguer" src="../icons/Hamburguer.svg" alt="Menu Hambúrguer" />
      </button>
      <div data-testid="top-title">
        {title}
      </div>
      <div />
    </div>
  )
};

export default Header;
