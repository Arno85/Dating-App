export class Photo {
  public id: number;
  public url: string;
  public description: string;
  public dateAdded: Date;
  public isMain: boolean;

  constructor() {
    this.id = null;
    this.url = '';
    this.description = '';
    this.dateAdded = new Date();
    this.isMain = false;
  }
}
