import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/shared/guards/auth/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { MembersDetailComponent } from './components/members/members-detail/members-detail.component';
import { MembersEditComponent } from './components/members/members-edit/members-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { UnsavedChangesGuard } from './guards/unsavedChanges/unsaved-changes.guard';
import { ListResolver } from './resolvers/list.resolver';


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
      { path: 'messages', component: MessagesComponent },
      { path: 'members', component: MembersListComponent },
      { path: 'members/edit', component: MembersEditComponent, resolve: { user: MemberEditResolver }, canDeactivate: [UnsavedChangesGuard] },
      { path: 'members/:id', component: MembersDetailComponent, resolve: { user: MemberDetailResolver } },
      { path: 'lists', component: ListsComponent, resolve : { users: ListResolver } }
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

