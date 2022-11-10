import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(!!data);
  const [userData, setUserData] = useState(data);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, userData, setUserData,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
