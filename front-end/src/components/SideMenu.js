import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import '../styles/SideMenu.css';

const SideMenu = () => {

  return (
    <div className="SideMenu_Container">
      <div className="ButtonContainer">
      <Link to="/profile">
        <button className="SideButton">Meu Perfil</button>
      </Link>
      <Link to="/orders">
        <button className="SideButton">Meus Pedidos</button>
      </Link>
      <Link to="/products">
        <button className="SideButton">Produtos</button>
      </Link>
      <ExitButton/>
      </div>
    </div>
    );
};

export default SideMenu;