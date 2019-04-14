import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  constructor(private _httpClient: HttpClient ) { }

  public values: any;

  public ngOnInit(): void {
    this.getValues();
  }

  public getValues(): void {
    this._httpClient.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

}
