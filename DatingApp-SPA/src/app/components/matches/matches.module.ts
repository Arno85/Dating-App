import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { MatchesCardComponent } from './matches-list/matches-card/matches-card.component';
import { MatchesDetailComponent } from './matches-detail/matches-detail.component';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    MatchesListComponent,
    MatchesCardComponent,
    MatchesDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxGalleryModule,
    TabsModule.forRoot()
  ],
  providers: [
    UsersLogicService,
    UsersDataService
  ],
  exports: [
    MatchesListComponent,
    MatchesCardComponent,
    MatchesDetailComponent
  ]
})
export class MatchesModule { }
