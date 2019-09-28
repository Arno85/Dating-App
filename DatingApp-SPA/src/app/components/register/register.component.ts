import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { IRegister } from 'src/shared/services/auth/logic/IRegister';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserToRegister } from '../../../shared/dtos/auth/UserToRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements IRegister, OnInit, OnDestroy {

  /* #region [PublicProperties] */
  public userToRegister: UserToRegister = new UserToRegister();
  public registerForm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;
  public emailExists = false;
  public usernameExists = false;
  public countryList$: Observable<Country[]>;
  /* #endregion */

  /* #region [PrivateProperties] */
  private _subscription: Subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService,
    private _router: Router,
    private _fb: FormBuilder,
    private _countriesService: CountriesService
  ) { }

  public ngOnInit(): void {
    this._createRegisterForm();
    this._fetchCountries();
    this._setDatePickerConfig();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _createRegisterForm(): void {
    this.registerForm = this._fb.group(
      {
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        username: ['', Validators.required],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\\d)(?=.*?\\W).*$')
        ]],
        confirmPassword: ['', Validators.required],
        gender: ['male'],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      },
      {
        validator: Validators.compose([
          this._passwordMatchValidator.bind(this),
          this._minAgeMatchValidator.bind(this)
        ])
      }
    );
  }

  public register(): void {
    if (this.registerForm.valid) {
      this.userToRegister = Object.assign({}, this.registerForm.value);
      this._authLogicService.register(this.userToRegister);
    }
  }

  public cancel(): void {
    this._router.navigate(['/home']);
  }

  public anyValidationError(fieldName: string): boolean {
    return this.registerForm.get(fieldName).errors && this.registerForm.get(fieldName).touched;
  }

  public allGood(fieldName: string) {
    return this.registerForm.get(fieldName).valid && this.registerForm.get(fieldName).touched;
  }

  public specificValidationError(fieldName: string, errorType: string): boolean {
    return this.registerForm.get(fieldName).hasError(errorType) && this.registerForm.get(fieldName).touched;
  }

  public passwordMatchValidation(): boolean {
    if (this.registerForm.get('confirmPassword').value !== '') {
      return this.registerForm.hasError('mismatch') && this.registerForm.get('confirmPassword').touched;
    }
  }

  public minAgeMatchValidation(): boolean {
    if (this.registerForm.get('dateOfBirth').value !== '') {
      return this.registerForm.hasError('underAge') && this.registerForm.get('dateOfBirth').touched;
    }
  }

  public verifyEmail(): void {
    if (!this.registerForm.get('email').errors && this.registerForm.get('email').touched) {
      this._subscription.add(
        this._authLogicService.verifyEmail(this.registerForm.get('email').value).subscribe((res) => {
          if (res) {
            this.registerForm.get('email').setErrors({ exist: true });
          }
        })
      );
    }
  }

  public verifyUsername(): void {
    if (!this.registerForm.get('username').errors && this.registerForm.get('username').touched) {
      this._subscription.add(
        this._authLogicService.verifyUsername(this.registerForm.get('username').value).subscribe((res) => {
          this.usernameExists = res;
        })
      );
    }
  }
  /* #endregion */

  /* #region [Private Methods] */
  private _passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  private _minAgeMatchValidator(g: FormGroup) {
    const dateOfBirthValue = g.get('dateOfBirth').value;
    const minAgeDate = new Date();

    if (dateOfBirthValue !== null) {
      minAgeDate.setFullYear( minAgeDate.getFullYear() - 18 );
      return dateOfBirthValue <= minAgeDate ? null : { underAge: true };
    }

    return null;
  }

  private _setDatePickerConfig(): void {
    this.bsConfig = {
      containerClass: 'theme-default'
    };
  }

  private _fetchCountries(): void {
    this.countryList$ = this._countriesService.getCountryList();
  }
  /* #endregion */

}
