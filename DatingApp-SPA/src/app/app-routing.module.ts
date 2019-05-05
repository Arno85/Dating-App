import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/shared/guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MatchesListComponent } from './components/matches/matches-list/matches-list.component';
import { MatchesDetailComponent } from './components/matches/matches-detail/matches-detail.component';

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
      { path: 'matches', component: MatchesListComponent },
      { path: 'matches/:id', component: MatchesDetailComponent },
      { path: 'lists', component: ListsComponent }
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

