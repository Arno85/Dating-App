import { Component, OnInit } from '@angular/core';
import { UserWithRole } from './../../../models/userWithRole.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsService } from './../../../../shared/services/notifications/notifications.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from './../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public users: UserWithRole[];
  public roles: string[];
  public bsModalRef: BsModalRef;

  constructor(
    private _adminService: AdminService,
    private _notificationService: NotificationsService,
    private _modalService: BsModalService) { }

  public ngOnInit(): void {
    this.getUsersWithRoles();
    this.getRoles();
  }

  public getUsersWithRoles(): void {
    this._adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    }, error => {
      this._notificationService.error(error);
    });
  }

  public getRoles(): void {
    this._adminService.getRoles().subscribe(roles => {
      this.roles = roles;
    }, error => {
      this._notificationService.error(error);
    });
  }

  public editRolesModal(user: UserWithRole): void {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };

    this.bsModalRef = this._modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe(roles => {
      if (JSON.stringify(roles.roleNames) !== JSON.stringify(user.roles)) {
        this._adminService.updateUserRoles(user, roles).subscribe(() => {
          user.roles = [...roles.roleNames];
        }, error => {
          this._notificationService.error(error);
        });
      }
    });
  }

  private getRolesArray(user: UserWithRole): any[] {
    const rolesToDisplay = [];
    const userRoles = user.roles;
    let isChecked = false;

    this.roles.forEach(roleName => {
      isChecked = userRoles.includes(roleName) ? true : false;
      rolesToDisplay.push({ value: roleName, checked : isChecked });
    });
    return rolesToDisplay;
  }

}
