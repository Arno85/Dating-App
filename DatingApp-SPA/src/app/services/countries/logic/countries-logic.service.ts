import { Injectable } from '@angular/core';
import { CountriesDataService } from '../data/countries-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Country } from 'src/app/models/countries/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesLogicService {

  private _countryArray = new Array<Country>();
  private readonly _countriesSubject = new BehaviorSubject<Country[]>(this._countryArray);

  constructor(private _countryDataService: CountriesDataService) { }

  public getCountryList(): Observable<Country[]> {
    if (!this._countryArray.length) {
      this.fetchCountries();
    }

    return this._countriesSubject.asObservable();
  }

  public fetchCountries(): void {
    this._countryDataService.getCountries().subscribe(res => {
      this._countriesSubject.next(this._countryArray = res);
    });
  }

}
