/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { BooksComponent } from './books.component';
import { BooksEffects } from './store/books.effects';
import { booksReducer } from './store/books.reducer';

const routes: Routes = [
  {path: '', component: BooksComponent, data: {title: 'Books'}}
];

@NgModule({
  declarations: [BooksComponent],
  imports: [
    SharedModule,
    EffectsModule.forFeature([BooksEffects]),
    StoreModule.forFeature('books', booksReducer),
    RouterModule.forChild(routes)
  ]
})
export class BooksModule {
}
