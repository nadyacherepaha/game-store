import React from "react";

export interface IAuthContext {
  signIn?: (userName: string) => void;
  signOut?: () => void;
  user?: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  signIn: undefined,
  signOut: undefined,
});

export default AuthContext;
