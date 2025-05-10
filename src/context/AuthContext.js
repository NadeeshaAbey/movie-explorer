import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find the user with matching credentials
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        const userData = { ...foundUser };
        delete userData.password; // Don't store password in user state
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const signup = (userData) => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if username already exists
      if (users.some((u) => u.username === userData.username)) {
        return false;
      }

      // Create new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Log in the new user
      const userDataWithoutPassword = { ...newUser };
      delete userDataWithoutPassword.password;
      setUser(userDataWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userDataWithoutPassword));
      return true;
    } catch (error) {
      console.error("Error during signup:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      // Only remove the user data, keep favorites in localStorage
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
