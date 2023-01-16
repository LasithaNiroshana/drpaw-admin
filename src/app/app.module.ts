import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PaymentsInfoComponent } from './payments/payments-info/payments-info.component';
import { AddVetComponent } from './doctors/add-vet/add-vet.component';
import { AddInstitutesComponent } from './doctors/add-institutes/add-institutes.component';
import { EditClinicComponent } from './doctors/edit-clinic/edit-clinic.component';
import { AddClinicComponent } from './doctors/add-clinic/add-clinic.component';
import { ConfirmCancelComponent } from './doctors/confirm-cancel/confirm-cancel.component';
import { ClinicInfoComponent } from './doctors/clinic-info/clinic-info.component';
import { AddUserComponent } from './doctors/add-user/add-user.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PaymentsInfoComponent,
    AddVetComponent,
    AddInstitutesComponent,
    EditClinicComponent,
    ClinicInfoComponent,
    AddClinicComponent,
    AddUserComponent,
    ConfirmCancelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxMatSelectSearchModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
