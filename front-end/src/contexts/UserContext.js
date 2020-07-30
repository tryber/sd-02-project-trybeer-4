import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [seller, setSeller] = useState(false);

  const role = seller ? 'admin' : 'client';

  const contextValues = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    seller,
    setSeller,
    role,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
