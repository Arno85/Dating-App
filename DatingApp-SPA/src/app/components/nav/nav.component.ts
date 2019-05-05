import { Component, OnInit } from '@angular/core';
import { AuthLogicService } from './../../../shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public title = 'Dating App';
  public showLinks: boolean;

  constructor(private _authLogicService: AuthLogicService) { }

  public ngOnInit(): void {
    this.showLinks = this._authLogicService.loggedIn();
  }
}
