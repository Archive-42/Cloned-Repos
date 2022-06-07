/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockHttpInterceptor } from '../mock/mock.http-interceptor';
import { HttpService } from './http.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { VerticalExpanderComponent } from './vertical-expander.component';

const modules = [
  CommonModule,
  FormsModule
];

const components = [
  VerticalExpanderComponent,
  SpinnerComponent
];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...modules, ...components],
  providers: []
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        HttpService,
        {provide: HTTP_INTERCEPTORS, useClass: MockHttpInterceptor, multi: true}
      ]
    };
  }
}
