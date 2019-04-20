import { UserToRegister } from 'src/shared/dtos/auth/UserToRegister';

export interface IRegister {
  register(userToRegister: UserToRegister): void;
}
