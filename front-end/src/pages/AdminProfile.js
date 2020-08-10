import React, { useEffect } from 'react';
import requestAPI from '../services/backEndAPI';
import AdminSideMenu from '../components/AdminSideMenu';
// import '../styles/AdminProfile.css';

const AdminProfile = () => {
  const { name, email } = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="admin-profile">
      <AdminSideMenu/>
      <h1>Perfil</h1>
      <div className="admin-profile-name" data-testid="profile-name">
        {`Nome: ${name}`}
      </div>
      <div className="admin-profile-email" data-testid="profile-email">
        {`Email: ${email}`}
      </div>
    </div>
  )
};

export default AdminProfile;
