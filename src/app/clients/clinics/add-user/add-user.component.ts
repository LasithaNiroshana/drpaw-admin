import { Component,OnInit,AfterContentInit, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClinicService} from '../../../common/clinic.service';

//Interface for payment details
export interface DoctorDetails {
  clinic:number;
  login:number;
  name: string;
  mobile: string;
  speciality:string;
  email:string;
  address:string;
  website:string;
  active:number;
  city:string;
  on_leave:number;
  clinic_name:string;
  clinic_address:string;
  clinic_mobile:string;
  search_list:string;
  clinic_logo:string;
  support_direct_visit:number;
  support_home_visit:number;
  support_virtual_visit:number;
  direct_visit_service_charge:number;
  home_visit_service_charge:number;
  virtual_visit_service_charge:number;
  on_live:number;
  user_type:number;
  capacity:number;
  on_emergency:number;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent implements OnInit,AfterViewInit{
  doctor:DoctorDetails={
    clinic:0,
    login:0,
    name: "",
    mobile: "",
    speciality:"",
    email: "",
    address: "",
    website: "",
    active:0,
    city: "",
    on_leave:0,
    clinic_name:"",
    clinic_address:"",
    clinic_mobile:"",
    search_list:"",
    clinic_logo:"",
    support_direct_visit:0,
    support_home_visit:0,
    support_virtual_visit:0,
    direct_visit_service_charge:1000,
    home_visit_service_charge:1000,
    virtual_visit_service_charge:1000,
    on_live:0,
    user_type:0,
    capacity:0,
    on_emergency:0
  }
  clinicList:any=[];

  constructor(private dialog:MatDialog,private clinicService:ClinicService){}

  ngAfterViewInit() {
    this.getClinics();
  }

  ngOnInit() {}

  getClinics(){
    this.clinicService.GetClinics().subscribe((res:any)=>{
      this.clinicList=res;
    }); 
  }

  onSubmit(userId:any){}
  cancelConfirm(){}
  closeAll(){
    this.dialog.closeAll();
  }
}
