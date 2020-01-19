import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/models/photo.model';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, Input, OnInit } from '@angular/core';

import { AuthLogicService } from '../../../../shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public currentMain: Photo;

  private readonly _baseUrl = `${environment.apiUrl}users/${this._authLogicService.getUserId()}/photos`;

  constructor(
    private _authLogicService: AuthLogicService,
    private _userService: UsersService,
    private _notificationsService: NotificationsService) { }

  public ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUploader(): void {
    this.uploader = new FileUploader({
      url: this._baseUrl,
      authToken: this._authLogicService.getToken(),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo: Photo = {
          id: res.id,
          url: res.url,
          description: res.description,
          dateAdded: res.dateAdded,
          isMain: res.isMain,
          isApproved: res.isApproved
        };

        if (photo.isMain) {
          this._authLogicService.changeMemberPhoto(photo.url);
        }
        this.photos.push(photo);
      }
    };
  }

  public setMainPhoto(photo: Photo): void {
    this._userService.setMainPhoto(this._authLogicService.getUserId(), photo.id)
      .subscribe(() => {
        this.currentMain = this.photos.find(p => p.isMain === true);
        this.currentMain.isMain = false;
        photo.isMain = true;
        // To change the photo in the navbar and the sidebar
        this._authLogicService.changeMemberPhoto(photo.url);
      }, error => {
        this._notificationsService.error(error);
      });
  }

  public deletePhoto(photoId: number): void {
    this._notificationsService.confirm('Are you sure you want to delete this photo?', 'Delete photo',  () => {
      this._userService.deletePhoto(this._authLogicService.getUserId(), photoId).subscribe(() => {
        const index = this.photos.findIndex(p => p.id === photoId);
        this.photos.splice(index, 1);
        this._notificationsService.success('The photo has been deleted');
      }, error => {
        this._notificationsService.error(error);
      });
    });
  }

}
