const TOKEN_KEY = "token";


// Save JWT token
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};


// Get JWT token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


// Remove JWT token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};


// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};