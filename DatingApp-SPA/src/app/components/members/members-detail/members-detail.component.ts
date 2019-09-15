import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersDetailComponent implements OnInit, OnDestroy {

  @ViewChild('memberTabs') public memberTabs: TabsetComponent;

  public user: User;
  public galleryOptions: NgxGalleryOptions[] = new Array<NgxGalleryOptions>();
  public galleryImages: NgxGalleryImage[] = new Array<NgxGalleryImage>();

  private _subscriptions = new Subscription();

  constructor(
    private _usersService: UsersService,
    private _notificationsService: NotificationsService,
    private _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    setTimeout(() => {
      this.galleryOptions = this.getOptions();
    });

    this._subscriptions.add(
      this._route.data.subscribe(data => {
        this.user = data['user'];
        this.galleryImages = this.getImages();
      })
    );

    this._route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
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

  public selectTab(tabId: number): void {
    this.memberTabs.tabs[tabId].active = true;
  }

}
