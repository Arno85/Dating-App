import { TimeAgoPipe } from 'time-ago-pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MembersCardComponent } from './members/members-card/members-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TimeAgoPipe,
    MembersCardComponent
  ],
  exports: [
    TimeAgoPipe,
    MembersCardComponent
  ]
})
export class SharedModule { }
