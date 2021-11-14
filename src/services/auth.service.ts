export const logout = () => {
  localStorage.removeItem("user");
};
const userStr = localStorage.getItem("user");
export const user = JSON.parse(userStr);

export const getCurrentUser = () => {
  if (userStr) return true;
  return null;
};

export const currentUser = getCurrentUser();
