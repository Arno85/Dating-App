import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/models/countries/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

/* #region [PrivateProperties] */
private readonly _apiUrl = environment.apiUrl;
private readonly _controller = 'countries/';
/* #endregion */

/* #region [PublicMethods] */

constructor(
  private _http: HttpClient
) { }

public getCountries(): Observable<Country[]> {
  return this._http.get<Country[]>(`${this._apiUrl}${this._controller}`);
}

/* #endregion */

}
