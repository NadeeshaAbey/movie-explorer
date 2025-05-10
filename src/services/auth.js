// Demo credentials
const DEMO_CREDENTIALS = {
  username: "demo",
  password: "demo123",
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Login function
export const login = (username, password) => {
  if (
    username === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password
  ) {
    localStorage.setItem("isAuthenticated", "true");
    return true;
  }
  return false;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};

// Get current user
export const getCurrentUser = () => {
  if (isAuthenticated()) {
    return {
      username: DEMO_CREDENTIALS.username,
    };
  }
  return null;
};
