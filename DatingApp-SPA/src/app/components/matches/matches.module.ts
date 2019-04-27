import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';

@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MatchesComponent
  ]
})
export class MatchesModule { }
