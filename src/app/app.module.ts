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
import { AddVetComponent } from './doctors/add-vet/add-vet.component';
import { AddInstitutesComponent } from './doctors/add-institutes/add-institutes.component';
import { EditClinicComponent } from './clients/clinics/edit-clinic/edit-clinic.component';
import { AddClinicComponent } from './clients/clinics/add-clinic/add-clinic.component';
import { ConfirmCancelComponent } from './doctors/confirm-cancel/confirm-cancel.component';
import { AddUserComponent } from './clients/clinics/add-user/add-user.component';
import { AppointmentInfoComponent } from './transactions/appointment-transactions/appointment-info/appointment-info.component';
import { ClinicSettlementsInfoComponent } from './settlements/clinic-settlements/clinic-settlements-info/clinic-settlements-info.component';
import { UpdateClinicSettlementsComponent } from './settlements/clinic-settlements/update-clinic-settlements/update-clinic-settlements.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddSalesAgentComponent } from './sales-agents/add-sales-agent/add-sales-agent.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddVetComponent,
    AddInstitutesComponent,
    EditClinicComponent,
    AddClinicComponent,
    AddUserComponent,
    ConfirmCancelComponent,
    AppointmentInfoComponent,
    ClinicSettlementsInfoComponent,
    UpdateClinicSettlementsComponent,
    AddSalesAgentComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    NgxDropzoneModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
