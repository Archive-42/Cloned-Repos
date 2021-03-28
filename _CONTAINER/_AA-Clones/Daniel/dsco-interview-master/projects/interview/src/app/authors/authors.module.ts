import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors.component';
import { authorsReducer } from './store/authors.reducer'
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsEffects } from './store/authors.effects';

const routes: Routes = [
  { path: '', component: AuthorsComponent }
];

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    SharedModule,
    EffectsModule.forFeature([AuthorsEffects]),
    StoreModule.forFeature('authors', authorsReducer),
    RouterModule.forChild(routes)
  ]
})
export class AuthorsModule { }
