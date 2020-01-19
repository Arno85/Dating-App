import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() public appHasRole: string[];

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _authService: AuthLogicService) { }

  public ngOnInit(): void {
    this._authService.currentUser.subscribe(user => {
      this._viewContainerRef.clear();

      if (user !== null) {
        const userRoles = this._authService.getRoles();

        if (userRoles.length > 0 && this._authService.roleMatch(this.appHasRole)) {
          this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
      }
    });
  }

}
