import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MembersEditComponent } from 'src/app/components/members/members-edit/members-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<MembersEditComponent> {
  canDeactivate(component: MembersEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }
    return true;
  }
}