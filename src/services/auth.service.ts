const userKey = "user";

export const logout = () => {
  localStorage.removeItem(userKey);
};

export const login = (userName: string) => {
  localStorage.setItem(userKey, userName);
};

export const getCurrentUser = (): boolean => !!localStorage.getItem(userKey);
