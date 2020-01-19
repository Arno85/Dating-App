import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MembersDetailComponent } from './components/members/members-detail/members-detail.component';
import { MembersEditComponent } from './components/members/members-edit/members-edit.component';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';
import { UnsavedChangesGuard } from './guards/unsavedChanges/unsaved-changes.guard';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { ListResolver } from './resolvers/list.resolver';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver }
      },
      {
        path: 'members',
        component: MembersListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/edit',
        component: MembersEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [UnsavedChangesGuard]
      },
      {
        path: 'members/:id',
        component: MembersDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'likes',
        component: ListsComponent,
        resolve: { users: ListResolver }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { roles: ['Admin', 'Moderator'] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: false,
      useHash: false,
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

