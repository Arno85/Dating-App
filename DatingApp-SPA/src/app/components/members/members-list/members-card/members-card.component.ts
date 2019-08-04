import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/users/user';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnInit {

  @Input() public user: User = new User();

  constructor() { }

  ngOnInit() {
  }

}
