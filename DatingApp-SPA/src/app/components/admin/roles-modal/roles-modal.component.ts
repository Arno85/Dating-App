import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserWithRole } from 'src/app/models/userwithrole.model';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent {

  public user: UserWithRole;
  public roles: any[];

  @Output() public updateSelectedRoles = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef) { }

  public updateRoles(): void {
    const rolesToUpdate = {
      roleNames: [...this.roles.filter(x => x.checked === true).map(x => x.value)]
    };
    this.updateSelectedRoles.emit(rolesToUpdate);
    this.bsModalRef.hide();
  }

  public disableIfAdmin(role: string): boolean {
    return role === 'Admin' && this.user.roles.includes('Admin') ? true : false;
  }

}
