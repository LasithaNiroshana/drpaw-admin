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
import { PetownersComponent } from './petowners/petowners.component';
import { ServicesComponent } from './services/services.component';
import { StoresComponent } from './stores/stores.component';
import { VeterinariansComponent } from './doctors/veterinarians/veterinarians.component';
import { InstitutesComponent } from './doctors/institutes/institutes.component';
import { ClinicInfoComponent } from './doctors/clinic-info/clinic-info.component';
import { AddUserComponent } from './doctors/add-user/add-user.component';

const routes: Routes = [
  {path:'',component:LoginpageComponent},
  {path:'login',component:LoginpageComponent},
  {path:'toolbar',component:ToolbarComponent},
  {path:'footer',component:FooterComponent},
  {path:'home',component:HomeComponent,
  children:[
    {path:'',component:DoctorsComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'doctors',component:DoctorsComponent,
    children:[
      {path:'veterinarians',component:VeterinariansComponent},
      {path:'institutes',component:InstitutesComponent},
    ]
  },
  {path:'clinicinfo',component:ClinicInfoComponent},
  {path:'adduser',component:AddUserComponent},
    {path:'payments',component:PaymentsComponent},
    {path:'petowners',component:PetownersComponent},
    {path:'services',component:ServicesComponent},
    {path:'stores',component:StoresComponent},
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
  PetownersComponent,
  ServicesComponent,
  StoresComponent,
  VeterinariansComponent,
  InstitutesComponent,
  ClinicInfoComponent,
  AddUserComponent
]