import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from"@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ErrorInterceptorInterceptor } from './core/interceptors/error-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
   BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
