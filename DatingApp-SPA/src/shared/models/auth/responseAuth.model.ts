import { User } from 'src/app/models/user.model';

export interface ResponseAuth {
  token: string;
  user: User;
}
