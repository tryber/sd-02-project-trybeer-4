import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const contextValues = {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  };

  return (
    <LoginContext.Provider value={contextValues}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
