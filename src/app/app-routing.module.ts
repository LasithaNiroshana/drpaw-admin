import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PaymentsComponent } from './payments/payments.component';
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
    {path:'transactions',component:TransactionsComponent,
    children:[
      {path:'appointments',component:AppointmentTransactionsComponent,
      children:[
        {path:'',component:AllAppointmentsComponent},
        {path:'allappointments',component:AllAppointmentsComponent}
      ]
    },
      {path:'servicetransactions',component:ServiceTransactionsComponent},
      {path:'storestransactions',component:StoreTransactionsComponent},
    ]
  },
  {path:'veterinarians',component:VeterinariansComponent},
  {path:'institutes',component:InstitutesComponent},
  {path:'refunds',component:RefundsComponent},
    {path:'payments',component:PaymentsComponent},
    {path:'petowners',component:PetownersComponent},
    {path:'settlements',component:SettlementsComponent},
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
  PaymentsComponent,
  ToolbarComponent,
  FooterComponent,
  HomeComponent,
  DashboardComponent,
  PaymentsComponent,
  UsersComponent,
  DoctorsComponent,
  ClinicInfoComponent,
  PetownersComponent,
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
  ClinicsComponent
]