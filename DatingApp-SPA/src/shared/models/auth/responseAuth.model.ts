import { User } from 'src/app/models/users/user.model';

export interface ResponseAuth {
  token: string;
  user: User;
}
