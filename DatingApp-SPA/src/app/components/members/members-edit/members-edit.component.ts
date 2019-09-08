import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { NgForm } from '@angular/forms';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { Subscription, Observable } from 'rxjs';
import { CountriesLogicService } from 'src/app/services/countries/logic/countries-logic.service';
import { Country } from 'src/app/models/countries/country.model';
import { BsDatepickerConfig } from 'ngx-bootstrap';

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

  @ViewChild('editForm') public editForm: NgForm;
  /* #endregion */

  /* #region [PrivateProperties] */
  private _subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UsersLogicService,
    private _authService: AuthLogicService,
    private _countriesService: CountriesLogicService
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });

    this._subscription.add(
      this._authService.currentPhotoUrl
        .subscribe(photoUrl => this.currentPhotoUrl = photoUrl
        )
    );
    this._fetchCountries();
    this._setDatePickerConfig();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updateUser(): void {
    this._userService.updateUser(this.user.id, this.user).subscribe(next => {
      this._notificationsService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this._notificationsService.error(error);
    });
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
