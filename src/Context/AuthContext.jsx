import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide context values
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state to manage session

  const setLogin = (userData) => {
    setUser(userData); // Store the user data in state
    localStorage.setItem("user", JSON.stringify(userData)); // Optionally persist to localStorage
  };

  const setLogout = () => {
    setUser(null); // Clear user session data
    localStorage.removeItem("user"); // Optionally clear localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
