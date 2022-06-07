/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule)},
  {path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule) },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    EffectsModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: true
    }),
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
