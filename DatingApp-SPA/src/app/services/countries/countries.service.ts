import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /* #region [PrivateProperties] */
  private _countryArray = new Array<Country>();
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'countries/';
  private readonly _countriesSubject = new BehaviorSubject<Country[]>(this._countryArray);
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _http: HttpClient
  ) { }

  public getCountryList(): Observable<Country[]> {
    if (!this._countryArray.length) {
      this._fetchCountries().subscribe(res => {
        this._countriesSubject.next(this._countryArray = res);
      });
    }

    return this._countriesSubject.asObservable();
  }
  /* #endregion */

  /* #region [PrivateMethods] */
  private _fetchCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${this._apiUrl}${this._controller}`);
  }
  /* #endregion */
}
