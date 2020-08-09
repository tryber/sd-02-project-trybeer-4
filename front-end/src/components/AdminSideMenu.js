import React from 'react';
import { Link } from 'react-router-dom';
import ExitButton from './ExitButton';
import '../styles/AdminSideMenu.css';

const AdminSideMenu = () => (
  <div className="AdminSideMenu_Container">
    <p>Trybeer</p>
    <div className="ButtonContainer">
      <Link to="/admin/orders">
        <button
          type="button"
          className="SideButton"
          data-testid="side-menu-item-orders"
        >
          Pedidos
        </button>
      </Link>
      <Link to="/admin/profile">
        <button
          type="button"
          className="SideButton"
          data-testid="side-menu-item-profile"
        >
          Perfil
        </button>
      </Link>
    </div>
    <div />
    <ExitButton />
  </div>
);

export default AdminSideMenu;
