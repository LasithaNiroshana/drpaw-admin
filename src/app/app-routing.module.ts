import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ClinicInfoComponent } from './clients/clinics/clinic-info/clinic-info.component';
import { PetownersComponent } from './petowners/petowners.component';
import { ServicesComponent } from './clients/services/services.component';
import { StoresComponent } from './clients/stores/stores.component';
import { VeterinariansComponent } from './doctors/veterinarians/veterinarians.component';
import { InstitutesComponent } from './doctors/institutes/institutes.component';
import { OtppageComponent } from './otppage/otppage.component';
import { ClientsComponent } from './clients/clients.component';
import { RefundsComponent } from './refunds/refunds.component';
import { ServiceTransactionsComponent } from './transactions/service-transactions/service-transactions.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { StoreTransactionsComponent } from './transactions/store-transactions/store-transactions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AppointmentTransactionsComponent } from './transactions/appointment-transactions/appointment-transactions.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { ClinicsComponent } from './clients/clinics/clinics.component';
import { SalesAgentsComponent } from './sales-agents/sales-agents.component';
import { ClinicSettlementsComponent } from './settlements/clinic-settlements/clinic-settlements.component';
import { AppointmentRefundsComponent } from './refunds/appointment-refunds/appointment-refunds.component';
import { ReportsComponent } from './reports/reports.component';
import { ClinicReportsComponent } from './reports/clinic-reports/clinic-reports.component';
import { ServiceProviderReportsComponent } from './reports/service-provider-reports/service-provider-reports.component';
import { StoreReportsComponent } from './reports/store-reports/store-reports.component';
import { NotPaidSettlementsComponent } from './settlements/clinic-settlements/not-paid-settlements/not-paid-settlements.component';
import { CompletedSettlementsComponent } from './settlements/clinic-settlements/completed-settlements/completed-settlements.component';
import { AppointmentTransactionsFilterFormComponent } from './transactions/appointment-transactions/appointment-transactions-filter-form/appointment-transactions-filter-form.component';
import { PaymentPendingSettlementsComponent } from './settlements/payment-pending-settlements/payment-pending-settlements.component';
import { PaymentCompletedSettlementsComponent } from './settlements/payment-completed-settlements/payment-completed-settlements.component';
import { RequestedAppointmentRefundsComponent } from './refunds/appointment-refunds/requested-appointment-refunds/requested-appointment-refunds.component';
import { AcceptedAppointmentRefundsComponent } from './refunds/appointment-refunds/accepted-appointment-refunds/accepted-appointment-refunds.component';
import { DeclinedAppointmentRefundsComponent } from './refunds/appointment-refunds/declined-appointment-refunds/declined-appointment-refunds.component';

const routes: Routes = [
  {path:'',component:LoginpageComponent},
  {path:'login',component:LoginpageComponent},
  {path:'otp',component:OtppageComponent},
  {path:'toolbar',component:ToolbarComponent},
  {path:'footer',component:FooterComponent},
  {path:'home',component:HomeComponent,
  children:[
    {path:'',component:ClientsComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'clients',component:ClientsComponent,
    children:[
      {path:'doctors',component:DoctorsComponent},
      {path:'clinics',component:ClinicsComponent},
      {path:'clinicinfo',component:ClinicInfoComponent},
      {path:'services',component:ServicesComponent},
      {path:'stores',component:StoresComponent},
    ]
  },
  {path:'salesagents',component:SalesAgentsComponent},
    {path:'transactions',component:TransactionsComponent,
    children:[
      {path:'appointments',component:AppointmentTransactionsComponent,
      children:[
        {path:'',component:AllAppointmentsComponent},
        {path:'allappointments',component:AllAppointmentsComponent,
      children:[
        {path:'appointmentfilter',component: AppointmentTransactionsFilterFormComponent,}
      ]
      }
      ]
    },
      {path:'servicetransactions',component:ServiceTransactionsComponent},
      {path:'storestransactions',component:StoreTransactionsComponent},
    ]
  },
  {path:'veterinarians',component:VeterinariansComponent},
  {path:'institutes',component:InstitutesComponent},
  {path:'refunds',component:RefundsComponent,
  children:[
    {path:'appointmentrefunds',component: AppointmentRefundsComponent}
  ]
},
{path:'requestedrefunds',component:RequestedAppointmentRefundsComponent},
{path:'acceptedrefunds',component:AcceptedAppointmentRefundsComponent},
{path:'declinedrefunds',component:DeclinedAppointmentRefundsComponent},
    {path:'petowners',component:PetownersComponent},
    {path:'settlements',component:SettlementsComponent,
    children:[
      {path:'clinicsettlements',component:ClinicSettlementsComponent,children:[
      ]},
    ]
  },
  {path:'paymentpendingsettlements',component:PaymentPendingSettlementsComponent},
  {path:'paymentcompletedsettlements',component:PaymentCompletedSettlementsComponent},
  {path:'notpaid',component:NotPaidSettlementsComponent},
  {path:'completed',component:CompletedSettlementsComponent},
  {path:'reports',component:ReportsComponent,
  children:[
    {path:'clinicreports',component:ClinicReportsComponent},
    {path:'serviceproviderreports',component:ServiceProviderReportsComponent},
    {path:'storereports',component:ServiceProviderReportsComponent},
  ]
},
    {path:'users',component:UsersComponent},
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  LoginpageComponent,
  ToolbarComponent,
  FooterComponent,
  HomeComponent,
  DashboardComponent,
  UsersComponent,
  DoctorsComponent,
  ClinicInfoComponent,
  PetownersComponent,
  SalesAgentsComponent,
  ServicesComponent,
  StoresComponent,
  VeterinariansComponent,
  InstitutesComponent,
  OtppageComponent,
  ClientsComponent,
  TransactionsComponent,
  SettlementsComponent,
  AppointmentTransactionsComponent,
  AllAppointmentsComponent,
  ServiceTransactionsComponent,
  StoreTransactionsComponent,
  RefundsComponent,
  ClinicsComponent,
  ClinicSettlementsComponent,
  AppointmentRefundsComponent,
  ReportsComponent,
  ClinicReportsComponent,
  ServiceProviderReportsComponent,
  StoreReportsComponent,
  NotPaidSettlementsComponent,
  CompletedSettlementsComponent,
  AppointmentTransactionsFilterFormComponent,
  PaymentPendingSettlementsComponent,
  PaymentCompletedSettlementsComponent,
  RequestedAppointmentRefundsComponent,
  AcceptedAppointmentRefundsComponent,
  DeclinedAppointmentRefundsComponent
]