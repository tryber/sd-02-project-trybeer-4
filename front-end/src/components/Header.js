import React from 'react';
import Hamburguer from '../icons/open-menu.png';
import SideMenu from './SideMenu';
import '../styles/Header.css';

const Header = ({title}) => {
  return (
    <div className="container">
      <button>
      <SideMenu />
        <img data-testid="top-hamburguer" src={Hamburguer} alt="Menu Hambúrguer" className="hamburguer-icon" />
      </button>
    <div data-testid="top-title">
      {title}
    </div>
    <div />
  </div>
  )
};

export default Header;