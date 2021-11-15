export const logout = () => {
  localStorage.removeItem("user");
};
const userStr = localStorage.getItem("user");
export const user = JSON.parse(userStr);

export const getCurrentUser = (): boolean => !!userStr;

export const currentUser = getCurrentUser();
