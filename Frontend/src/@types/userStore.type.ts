export interface userStoreI {
  user: string,
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateUser: () => void;
}
