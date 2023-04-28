import { Component,OnInit,AfterContentChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {ClinicService} from '../../../common/clinic.service';
import {SpinnerService} from '../../../common/spinner.service';
import {FormControl} from '@angular/forms';

// https://drpawservices.life/admin/auth/user/

//Interface for payment details
export interface DoctorDetails {
  clinic:number;
  login:number;
  name: string;
  mobile: string;
  // speciality:string;
  email:string;
  address:string;
  website:string;
  active:number;
  city:string;
  on_leave:number;
  clinic_name:string;
  clinic_address:string;
  clinic_mobile:string;
  clinic_logo:string;
  support_direct_visit:number;
  support_home_visit:number;
  support_virtual_visit:number;
  direct_visit_service_charge:number;
  home_visit_service_charge:number;
  virtual_visit_service_charge:number;
  user_type:number;
  is_sms:number;
  slva_reg_no:string;
}

export interface AppointmentSettings{
  doctor:number;
  start_time_am:string;
  end_time_am:string;
  start_time_pm:string;
  end_time_pm:string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent implements OnInit,AfterViewInit,AfterContentChecked{
  myControl = new FormControl('');
  doctor:DoctorDetails={
    clinic:0,
    login:0,
    name: "",
    mobile: "",
    // speciality:"",
    email: "",
    address: "",
    website: "",
    active:0,
    city: "",
    on_leave:0,
    clinic_name:"",
    clinic_address:"",
    clinic_mobile:"",
    clinic_logo:"",
    support_direct_visit:0,
    support_home_visit:0,
    support_virtual_visit:0,
    direct_visit_service_charge:1000,
    home_visit_service_charge:1000,
    virtual_visit_service_charge:1000,
    user_type:0,
    is_sms:0,
    slva_reg_no:""
  }

  appointmentSettings:AppointmentSettings={
    doctor:0,
    start_time_am:"08:00",
    end_time_am:"10:00",
    start_time_pm:"16:00",
    end_time_pm:"18:00"
  }

  clinicList:any=[];
  clinicListID:any=[];
  password:string="";
  btndisabled=true;
  selectedTime:string="";

  clinicUsers:any=[];
  userAccessList:any=[];

  clinicUserList:any=[];

  loading$ = this.spinner.loading$;

  filteredOptions!: Observable<string[]>;

  constructor(private dialog:MatDialog,private clinicService:ClinicService,private snackbar:MatSnackBar, private cdr:ChangeDetectorRef, private spinner:SpinnerService){
    this.cdr.detach();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.getClinics();
    
  }

  ngOnInit() {
  }

  //Get clinic list
  getClinics(){
    this.clinicService.GetClinics().subscribe((res:any)=>{
      this.clinicList=res;
      this.clinicListID=res;
    }); 
  }

  //Adding the doctor board and doctor appointment settings
  onSubmit(){
    // this.spinner.show();
    var doctorFormdata = new FormData();
    var usersList=this.userAccessList;

    usersList.forEach((user:any) => {
      if(this.doctor.mobile === user.username){
        this.doctor.login=user.id;
      }
    });
    
    doctorFormdata.append("name", this.doctor.name);
    doctorFormdata.append("clinic", this.doctor.clinic.toString());
    doctorFormdata.append("login", this.doctor.login.toString());
    doctorFormdata.append("mobile", this.doctor.mobile);
    doctorFormdata.append("email", this.doctor.email);
    doctorFormdata.append("address", this.doctor.address);
    doctorFormdata.append("city", this.doctor.city);
    doctorFormdata.append("website", this.doctor.website);
    doctorFormdata.append("clinic_name", this.doctor.clinic_name);
    doctorFormdata.append("clinic_address", this.doctor.clinic_address);
    doctorFormdata.append("clinic_mobile", this.doctor.clinic_mobile);
    doctorFormdata.append("support_direct_visit", this.doctor.support_direct_visit.toString());
    doctorFormdata.append("support_home_visit", this.doctor.support_home_visit.toString());
    doctorFormdata.append("support_virtual_visit", this.doctor.support_virtual_visit.toString());
    doctorFormdata.append("direct_visit_service_charge", this.doctor.direct_visit_service_charge.toString());
    doctorFormdata.append("home_visit_service_charge", this.doctor.home_visit_service_charge.toString());
    doctorFormdata.append("virtual_visit_service_charge", this.doctor.virtual_visit_service_charge.toString());
    doctorFormdata.append("user_type", this.doctor.user_type.toString());
    doctorFormdata.append("is_sms", this.doctor.is_sms.toString());
    doctorFormdata.append("slva_reg_no", this.doctor.slva_reg_no);

    if(
      this.btndisabled===true
      &&
      this.doctor.name!=""
      &&
      this.doctor.clinic!=null
      &&
      this.doctor.mobile!=""
      // &&
      // this.doctor.email!=""
      &&
      this.doctor.address!=""
      &&
      this.doctor.city!=""
      // &&
      // this.doctor.slva_reg_no!=""
      // &&
      // this.doctor.clinic_name!=""
      // &&
      // this.doctor.clinic_address!=""
      // &&
      // this.doctor.clinic_mobile!=""
      &&
      this.doctor.direct_visit_service_charge!=null
      &&
      this.doctor.home_visit_service_charge!=null
      &&
      this.doctor.virtual_visit_service_charge!=null
      ){
        this.clinicService.AddClinicUser(doctorFormdata).subscribe({
          next:(res:any)=>{
            console.log(res);
          },
                complete: () => {
                  this.spinner.hide();
                  this.setAppointmentSettings();
                  // this.openSnackBar('Successfully added doctorboard!','OK')
                },
                error: (e) => {this.openSnackBar('Error occured while adding new vet!'+ e,'OK');
                this.spinner.hide();
              },
              });
            this.dialog.closeAll();
      }
      else{
        this.openSnackBar('One or more fields missing. Please fill them to continue!','OK');
      }

  }

  cancelConfirm(){}
  closeAll(){
    this.dialog.closeAll();
  }

  //Searching the entered mobile number already exist 
  searchMobile(event:any){
   if(event.length==10){
    this.spinner.show();
    this.clinicService.getUserAccessList().subscribe({
      next:(res:any)=>{
        this.userAccessList=res;
      },
      complete:()=>{
        let userExists = false;
        this.userAccessList.forEach((user:any) => {
          if (this.doctor.mobile === user.username) {
            userExists = true;
          }
        });

        if (userExists) {
          this.btndisabled = true;
          this.openSnackBar('Mobile number already registered. Please enter doctor details to continue!','OK');
        } else {
          this.btndisabled = false;
          this.openSnackBar('Please click register to register the mobile number!','OK');
        }
        this.spinner.hide();
      },
      error:(e)=>{
        this.spinner.hide();
        this.openSnackBar('Please enter mobile number and try again!','OK');
      }
    });   
   }
  }

  //Set appointment settings
  setAppointmentSettings(){
    this.clinicService.getClinicUsers(this.doctor.clinic).subscribe({
      next:(res:any)=>{
        this.clinicUserList=res;
      },
      complete:()=>{
        // console.log(this.clinicUserList);
        this.clinicUserList.forEach((user:any) => {
          if(this.doctor.mobile===user.mobile){
            this.appointmentSettings.doctor=user.id;
          }
        });
       
        var appointmentFormData=new FormData();
        appointmentFormData.append("doctor", this.appointmentSettings.doctor.toString());
        appointmentFormData.append("start_time_am", this.appointmentSettings.start_time_am.toString()+':00');
        appointmentFormData.append("end_time_am", this.appointmentSettings.end_time_am.toString() + ':00');
        appointmentFormData.append("start_time_pm", this.appointmentSettings.start_time_pm.toString() + ':00');
        appointmentFormData.append("end_time_pm", this.appointmentSettings.end_time_pm.toString() + ':00');

        this.clinicService.setDocAppoitnmentSettings(appointmentFormData).subscribe({
              complete:()=>{this.openSnackBar('Successfully added doctor!','OK');
              this.spinner.hide();
            },
            error:(e)=>{
              this.openSnackBar('Error adding new doctor!'+e,'OK');
              // console.log(e);
              this.spinner.hide();
            }
            });
        
      },
      // error:(e)=>console.log(e)
    },
    
    );
  }

  //Registering mobile number
   addUserAccess(){
    this.spinner.show();
    var userFormData = new FormData();
    userFormData.append("username", this.doctor.mobile);
    userFormData.append("password", 'DrPaw@'+this.doctor.mobile);
    this.clinicService.AddUserAccess(userFormData).subscribe({
      complete:()=>{
        this.spinner.hide();
        this.openSnackBar('Successfully registered the user. Please enter other details to continue.','OK');
        this.clinicService.getUserAccessList().subscribe({
          next:(res:any)=>{
            this.userAccessList=res;
          },
          complete:()=>{
            console.log(this.userAccessList);
          }
        });
        this.btndisabled=true;
      },
      error:(e)=>{
        this.spinner.hide();
        this.openSnackBar('Error registering the user. Please try again.','OK');
      }
    });
  }

    //Open snackbar 
    openSnackBar(message: string, action: string) {
      this.snackbar.open(message, action);
    }

}







