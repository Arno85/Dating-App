import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsService } from './../../../../shared/services/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.scss']
})
export class PhotoManagementComponent implements OnInit, OnDestroy {

  public photos: Photo[];
  private _subscriptions = new Subscription();

  constructor(
    private _adminService: AdminService,
    private _notificationsService: NotificationsService
    ) { }

  public ngOnInit(): void {
    this.getPhotosForModeration();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private getPhotosForModeration(): void {
    this._subscriptions.add(
      this._adminService.getPhotosForModeration()
        .subscribe(photos => {
          this.photos = photos;
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

  public moderatePhoto(moderation: boolean, photoId: number): void {
    this._subscriptions.add(
      this._adminService.moderatePhoto(moderation, photoId)
        .subscribe(() => {
          const index = this.photos.findIndex(p => p.id === photoId);
          this.photos.splice(index, 1);
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

}
