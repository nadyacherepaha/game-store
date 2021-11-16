const user = "user";

export const logout = () => {
  localStorage.removeItem(user);
};

export const login = (userName: string) => {
  localStorage.setItem(user, userName);
};

export const getCurrentUser = (): boolean => !!localStorage.getItem(user);
