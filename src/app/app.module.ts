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
import { EditClinicComponent } from './clients/clinics/edit-clinic/edit-clinic.component';
import { AddClinicComponent } from './clients/clinics/add-clinic/add-clinic.component';
import { ConfirmCancelComponent } from './doctors/confirm-cancel/confirm-cancel.component';
import { AddUserComponent } from './clients/clinics/add-user/add-user.component';
import { AppointmentInfoComponent } from './transactions/appointment-transactions/appointment-info/appointment-info.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PaymentsInfoComponent,
    AddVetComponent,
    AddInstitutesComponent,
    EditClinicComponent,
    AddClinicComponent,
    AddUserComponent,
    ConfirmCancelComponent,
    AppointmentInfoComponent,
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
