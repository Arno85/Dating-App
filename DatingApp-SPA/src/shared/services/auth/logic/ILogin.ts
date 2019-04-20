import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';

export interface ILogin {
  login(userToLogin: UserToLogin): void ;
  loggedIn(): boolean;
  logout(): void;
}
