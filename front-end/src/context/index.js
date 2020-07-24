import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValues = {
    email,
    setEmail,
    password,
    setPassword,
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
