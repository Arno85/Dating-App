import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PhotoManagementComponent } from './photo-management/photo-management.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { AdminService } from 'src/app/services/admin/admin.service';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { FormsModule } from '@angular/forms';
import { HasRoleDirective } from 'src/app/directives/hasRole.directive';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    AdminComponent,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    HasRoleDirective
  ],
  exports: [
    AdminComponent,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    HasRoleDirective
  ],
  providers: [
    AdminService
  ],
  entryComponents: [
    RolesModalComponent
  ]
})
export class AdminModule { }
