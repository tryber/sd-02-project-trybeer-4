import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import '../styles/SideMenu.css';

const SideMenu = ({open}) => {
  if(!open) {
    return null
  }

  return (
    <div className="SideMenu_Container">
      <div className="ButtonContainer">
      <Link to="/products">
        <button className="SideButton" data-testid="side-menu-item-products">Produtos</button>
      </Link>
      <Link to="/orders">
        <button className="SideButton" data-testid="side-menu-item-my-orders">Meus Pedidos</button>
      </Link>
      <Link to="/profile">
        <button className="SideButton" data-testid="side-menu-item-my-profile">Meu Perfil</button>
      </Link>
      </div>
      <ExitButton/>
    </div>
    );
};

export default SideMenu;