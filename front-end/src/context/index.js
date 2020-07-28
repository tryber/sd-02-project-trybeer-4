import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [seller, setSeller] = useState(false);

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
  };

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
