const checkCurrentUserExistence = "user";

export const logout = () => {
  localStorage.removeItem(checkCurrentUserExistence);
};

export const login = (userName: string) => {
  localStorage.setItem(checkCurrentUserExistence, userName);
};

export const getCurrentUser = (): boolean => !!localStorage.getItem(checkCurrentUserExistence);
