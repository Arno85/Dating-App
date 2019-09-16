import { Photo } from './photo.model';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
  isLikedByUser: boolean;
}
