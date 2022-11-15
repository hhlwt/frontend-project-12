import React, {
  createContext, useState, useContext, useMemo,
} from 'react';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

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

  const authProviderValue = useMemo(() => ({
    logIn, logOut, userData, setUserData,
  }), [userData]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
