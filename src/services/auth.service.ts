const checkCurrentUserExistence = "user";

export const logout = () => {
  localStorage.removeItem(checkCurrentUserExistence);
};

export const login = (userName: string) => {
  localStorage.setItem(checkCurrentUserExistence, userName);
};
export const currentUser = localStorage.getItem(checkCurrentUserExistence);

export const getCurrentUserExists = (): boolean => !!currentUser;

export const getCurrentUser = () => localStorage.getItem(checkCurrentUserExistence);
