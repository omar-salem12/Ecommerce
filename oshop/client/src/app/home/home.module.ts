import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppModule } from '../app.module';


@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
  CommonModule,
    AppModule

  ],
  exports: [HomeComponent],



})
export class HomeModule { }
