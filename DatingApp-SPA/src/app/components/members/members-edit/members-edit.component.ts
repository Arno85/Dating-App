import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import {
  Component, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersEditComponent implements OnInit, OnDestroy {

  /* #region [PublicProperties] */
  public user: User;
  public currentPhotoUrl: string;
  public countryList = new Observable<Country[]>();
  public bsConfig: Partial<BsDatepickerConfig>;

  @ViewChild('editForm', {static: false}) public editForm: NgForm;
  /* #endregion */

  /* #region [PrivateProperties] */
  private _subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: any): void {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UsersService,
    private _authService: AuthLogicService,
    private _countriesService: CountriesService
  ) { }

  public ngOnInit(): void {
    this._subscription.add(
      this._route.data.subscribe(data => this.user = data['user'])
    );

    this._subscription.add(
      this._authService.currentPhotoUrl.subscribe(photoUrl => this.currentPhotoUrl = photoUrl)
    );

    this._fetchCountries();
    this._setDatePickerConfig();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updateUser(): void {
    this._subscription.add(
      this._userService.updateUser(this.user.id, this.user).subscribe(next => {
        this._notificationsService.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this._notificationsService.error(error);
      })
    );
  }

  /* #endregion */

  /* #region [PrivateMethods] */
  private _fetchCountries(): void {
    this.countryList = this._countriesService.getCountryList();
  }

  private _setDatePickerConfig(): void {
    this.bsConfig = {
      containerClass: 'theme-default'
    };
  }

  /* #endregion */
}
