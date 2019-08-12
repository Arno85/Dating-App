import { Photo } from './photo';

export class User {
  public id: number;
  public username: string;
  public knownAs: string;
  public age: number;
  public gender: string;
  public created: Date;
  public lastActive: Date;
  public photoUrl: string;
  public city: string;
  public country: string;
  public interests?: string;
  public introduction?: string;
  public lookingFor?: string;
  public photos?: Photo[];

  constructor() {
    this.id = null;
    this.username = '';
    this.knownAs = '';
    this.age = null;
    this.gender = '';
    this.created = new Date();
    this.lastActive = new Date();
    this.photoUrl = '../assets/img/user.png';
    this.city = '';
    this.country = '';
    this.interests = '';
    this.introduction = '';
    this.lookingFor = '';
    this.photos = new Array<Photo>();
  }
}
