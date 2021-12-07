const checkCurrentUserExistence = "user";
const checkAdminRoleExistance = "admin";

export const logout = () => {
  localStorage.removeItem(checkCurrentUserExistence);
};

export const login = (userName: string) => {
  localStorage.setItem(checkCurrentUserExistence, userName);
};

export const adminLogout = () => {
  localStorage.removeItem(checkAdminRoleExistance);
};

export const adminLogin = (isAdmin: string) => {
  localStorage.setItem(checkAdminRoleExistance, isAdmin);
};

export const adminRoleExist = () => localStorage.getItem(checkAdminRoleExistance);
export const currentUserExists = (): boolean => !!localStorage.getItem(checkCurrentUserExistence);
export const getCurrentUser = () => localStorage.getItem(checkCurrentUserExistence);
