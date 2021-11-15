export const logout = () => {
  localStorage.removeItem("user");
};

export const login = (userName: string) => {
  localStorage.setItem("user", userName);
};

export const userStr = localStorage.getItem("user");
export const getCurrentUser = (): boolean => !!userStr;
