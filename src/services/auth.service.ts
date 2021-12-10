const userKey = "user";
const adminRoleKey = "admin";

export const logout = () => {
  localStorage.removeItem(userKey);
};

export const login = (userName: string) => {
  localStorage.setItem(userKey, userName);
};

export const adminLogout = () => {
  localStorage.removeItem(adminRoleKey);
};

export const adminLogin = (isAdmin: string) => {
  localStorage.setItem(adminRoleKey, isAdmin);
};

export const getAdminRole = () => localStorage.getItem(adminRoleKey);
export const currentUserExists = (): boolean => !!localStorage.getItem(userKey);
export const getCurrentUser = () => localStorage.getItem(userKey);
