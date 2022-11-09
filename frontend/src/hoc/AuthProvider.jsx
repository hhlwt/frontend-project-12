import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userId'));
  const token = userData ? userData.token : '';

  const [loggedIn, setLoggedIn] = useState(!!token);
  const [userToken, setUserToken] = useState(token);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUserToken('');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, setUserToken, userToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
