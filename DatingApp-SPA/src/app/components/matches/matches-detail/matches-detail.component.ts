import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { User } from 'src/app/models/users/user';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-matches-detail',
  templateUrl: './matches-detail.component.html',
  styleUrls: ['./matches-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatchesDetailComponent implements OnInit {

  public user: User = new User();
  public galleryOptions: NgxGalleryOptions[] = new Array<NgxGalleryOptions>();
  public galleryImages: NgxGalleryImage[] = new Array<NgxGalleryImage>();

  constructor(
    private _usersService: UsersLogicService,
    private _notificationsService: NotificationsService,
    private _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._loadUser();
  }

  public _loadUser(): void {
    const userId = parseInt(this._route.snapshot.params['id'], 10);
    this._usersService.getUser(userId).subscribe(user => {
      this.user = user;
      this.galleryOptions = this.getOptions();
      this.galleryImages = this.getImages();
    }, (error => {
      this._notificationsService.error(error);
    }));
  }

  public getImages(): NgxGalleryImage[] {
    const imageUrls = new Array<NgxGalleryImage>();
    this.user.photos.map(img => {
      imageUrls.push({
        small: img.url,
        medium: img.url,
        big: img.url,
        description: img.description
      });
    });

    return imageUrls;
  }

  public getOptions(): NgxGalleryOptions[] {
    return [
      {
        width: '600px',
        height: '600px',
        fullWidth: true,
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ] as NgxGalleryOptions[];
  }

}
