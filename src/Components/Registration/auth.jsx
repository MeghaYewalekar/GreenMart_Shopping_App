export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token; // Returns true if the token exists
};

export const logout = () => {
  localStorage.removeItem("accessToken"); // Remove token from storage
};
