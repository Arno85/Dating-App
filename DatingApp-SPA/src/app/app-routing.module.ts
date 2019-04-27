import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MatchesComponent } from './components/matches/matches.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'messages',  component: MessagesComponent },
  { path: 'matches',  component: MatchesComponent },
  { path: 'lists',  component: ListsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**',  redirectTo: '/home', pathMatch: 'full' }
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

