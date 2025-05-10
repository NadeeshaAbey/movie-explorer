import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Demo credentials
const DEMO_CREDENTIALS = {
  username: "demo",
  password: "demo123",
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setUser({ username: DEMO_CREDENTIALS.username });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (
      username === DEMO_CREDENTIALS.username &&
      password === DEMO_CREDENTIALS.password
    ) {
      setUser({ username: DEMO_CREDENTIALS.username });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const signup = () => {
    // For demo purposes, signup just logs in with demo credentials
    return login(DEMO_CREDENTIALS.username, DEMO_CREDENTIALS.password);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
