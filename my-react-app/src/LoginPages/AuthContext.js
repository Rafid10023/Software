import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '' }); // Initialize user with an empty username

  const login = (username) => {
    setIsLoggedIn(true);
    setUser({ username }); // Update the user object with the logged-in username
    // Possibly set session token here if using token-based authentication
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ username: '' }); // Reset the user object
    // Clear session token here if using token-based authentication
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};