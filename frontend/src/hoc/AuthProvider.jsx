import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('userId'));
  const [userData, setUserData] = useState(data);

  const logIn = (authData) => {
    setUserData(authData);
    localStorage.setItem('userId', JSON.stringify(authData));
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserData(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      logIn, logOut, userData, setUserData,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
