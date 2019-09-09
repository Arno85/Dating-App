import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { MembersCardComponent } from './members-list/members-card/members-card.component';
import { MembersDetailComponent } from './members-detail/members-detail.component';
import { MembersListComponent } from './members-list/members-list.component';
import { RouterModule } from '@angular/router';
import { TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { MembersEditComponent } from './members-edit/members-edit.component';
import { MemberEditResolver } from 'src/app/resolvers/member-edit.resolver';
import { MemberDetailResolver } from 'src/app/resolvers/member-detail.resolver';
import { FormsModule } from '@angular/forms';
import { UnsavedChangesGuard } from 'src/app/guards/unsavedChanges/unsaved-changes.guard';
import { PhotoEditorComponent } from './members-edit/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ListResolver } from 'src/app/resolvers/list.resolver';
import { ListsComponent } from '../lists/lists.component';

@NgModule({
  declarations: [
    MembersListComponent,
    MembersCardComponent,
    MembersDetailComponent,
    MembersEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    ListsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    UsersLogicService,
    UsersDataService,
    MemberDetailResolver,
    MemberEditResolver,
    ListResolver,
    UnsavedChangesGuard
  ],
  exports: [
    MembersListComponent,
    MembersCardComponent,
    MembersDetailComponent,
    MembersEditComponent,
    PhotoEditorComponent,
    ListsComponent
  ]
})
export class MembersModule { }
