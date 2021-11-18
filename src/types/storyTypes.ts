export interface IUserState {
  user: boolean;
  signIn?: (userName: string) => void;
  signOut?: () => void;
}
