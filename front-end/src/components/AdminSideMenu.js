import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import '../styles/AdminSideMenu.css';

const AdminSideMenu = () => {

  return (
    <div className="AdminSideMenu_Container">
      <p>Trybeer</p>
      <div className="ButtonContainer">
      <Link to="/admin/orders">
        <button className="SideButton" data-testid="side-menu-item-orders">Pedidos</button>
      </Link>
      <Link to="/admin/profile">
        <button className="SideButton" data-testid="side-menu-item-profile">Perfil</button>
      </Link>
      </div>
      <div></div>
      <ExitButton/>
    </div>
    );
};

export default AdminSideMenu;