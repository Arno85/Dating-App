import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/users/user';

@Component({
  selector: 'app-matches-card',
  templateUrl: './matches-card.component.html',
  styleUrls: ['./matches-card.component.scss']
})
export class MatchesCardComponent implements OnInit {

  @Input() public user: User = new User();

  constructor() { }

  ngOnInit() {
  }

}
