import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule, ButtonsModule, PaginationModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { SharedModule } from 'src/app/components/shared.module';
import { UnsavedChangesGuard } from 'src/app/guards/unsavedChanges/unsaved-changes.guard';
import { MemberDetailResolver } from 'src/app/resolvers/member-detail.resolver';
import { MemberEditResolver } from 'src/app/resolvers/member-edit.resolver';
import { UsersService } from 'src/app/services/users/users.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MembersDetailComponent } from './members-detail/members-detail.component';
import { MembersEditComponent } from './members-edit/members-edit.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersMessagesComponent } from './members-messages/members-messages.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { MemberListResolver } from 'src/app/resolvers/member-list.resolver';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// Fix for the HammerGestureConfig error with Angular 8
export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    MembersListComponent,
    MembersDetailComponent,
    MembersEditComponent,
    MembersMessagesComponent,
    PhotoEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxGalleryModule,
    SharedModule,
    TabsModule.forRoot(),
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [
    UsersService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    UnsavedChangesGuard,
    // Fix for the HammerGestureConfig error with Angular 8
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  exports: [
    MembersListComponent,
    MembersDetailComponent,
    MembersEditComponent,
    MembersMessagesComponent,
    PhotoEditorComponent
  ]
})
export class MembersModule { }
