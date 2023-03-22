import { Component,OnInit,AfterContentChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClinicService} from '../../../common/clinic.service';
import {SpinnerService} from '../../../common/spinner.service';

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
    start_time_am:"",
    end_time_am:"",
    start_time_pm:"",
    end_time_pm:""
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

  constructor(private dialog:MatDialog,private clinicService:ClinicService,private snackbar:MatSnackBar, private cdr:ChangeDetectorRef, private spinner:SpinnerService){
    this.cdr.detach();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.getClinics();
  }

  ngOnInit() {}

  getClinics(){
    this.clinicService.GetClinics().subscribe((res:any)=>{
      this.clinicList=res;
      this.clinicListID=res;
    }); 
  }

  // onSubmit(){
  //   var userID;
  //   this.clinicService.getUserAccessList().subscribe((res:any)=>{
  //     this.userAccessList=res;
  //     this.userAccessList.forEach((user:any) => {
  //       if(this.doctor.mobile===user.username){
  //         userID=user.id;
  //       }
  //       else{

  //       }
  //     });
  //   });  
    
  // }

  onSubmit(){
    this.spinner.show();
    var formdata = new FormData();
    this.clinicService.getUserAccessList().subscribe({
      // complete:()=>this.spinner.hide(),
      next:(res:any)=>{
        this.userAccessList=res;
        this.userAccessList.forEach((element:any) => {
          if(this.doctor.mobile===element.username){
            this.doctor.login=element.id
            
    formdata.append("name", this.doctor.name);
    formdata.append("clinic", this.doctor.clinic.toString());
    formdata.append("login", this.doctor.login.toString());
    formdata.append("mobile", this.doctor.mobile);
    formdata.append("email", this.doctor.email);
    formdata.append("address", this.doctor.address);
    formdata.append("city", this.doctor.city);
    formdata.append("website", this.doctor.website);
    formdata.append("clinic_name", this.doctor.clinic_name);
    formdata.append("clinic_address", this.doctor.clinic_address);
    formdata.append("clinic_mobile", this.doctor.clinic_mobile);
    formdata.append("support_direct_visit", this.doctor.support_direct_visit.toString());
    formdata.append("support_home_visit", this.doctor.support_home_visit.toString());
    formdata.append("support_virtual_visit", this.doctor.support_virtual_visit.toString());
    formdata.append("direct_visit_service_charge", this.doctor.direct_visit_service_charge.toString());
    formdata.append("home_visit_service_charge", this.doctor.home_visit_service_charge.toString());
    formdata.append("virtual_visit_service_charge", this.doctor.virtual_visit_service_charge.toString());
    formdata.append("user_type", this.doctor.user_type.toString());
    formdata.append("is_sms", this.doctor.is_sms.toString());
    formdata.append("slva_reg_no", this.doctor.slva_reg_no);

    if(
      this.btndisabled=true
      &&
      this.doctor.name!=""
      &&
      this.doctor.clinic!=null
      &&
      this.doctor.mobile!=""
      &&
      this.doctor.email!=""
      &&
      this.doctor.address!=""
      &&
      this.doctor.city!=""
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
      this.clinicService.AddUser(formdata).subscribe({
        complete: () => {
          this.spinner.hide();
          this.setAppointmentSettings();
        },
        error: (e) => {this.openSnackBar('Error occured while adding new vet!'+ e,'OK');
        this.spinner.hide();
      },
      });
      this.spinner.hide();
    this.dialog.closeAll();
    }
    else{
      this.spinner.hide();
      this.snackbar.open("One or more fields missing! Please check the form again.","OK");
    }
          }
          else{
            //
          }
        });
      },
      error:(e)=>this.spinner.hide()
    }
    );  
  }


  cancelConfirm(){}
  closeAll(){
    this.dialog.closeAll();
  }

  //Searching the entered mobile number already exist 
  searchMobile(event:any){
   if(event.length==10){
    this.clinicService.getAllUsers().subscribe({
      complete:()=>this.spinner.hide(),
      next:(res:any)=>{
        this.clinicUsers=res;
        if(this.clinicUsers=[]){
          this.btndisabled=false;
        }
        else{
          this.clinicUsers.forEach((element:any) => {
            if(this.doctor.mobile==element.mobile){
              this.btndisabled=true;
              this.openSnackBar('Entered mobile number already exists. Please enter another mobile number!','OK');
            }
            else{
              this.btndisabled=false;
            }
          });
        }
      },
      error:(e)=>this.spinner.hide()
    });
   }
   this.spinner.hide();
  }

  //Set appointment settings
  setAppointmentSettings(){
    this.spinner.show();
    var appointmentFormData=new FormData();
    this.clinicService.getClinicUsers(this.doctor.clinic).subscribe({
      next:(res:any)=>{
        this.clinicUserList=res;
        this.clinicUserList.forEach((user:any) => {
          if(this.doctor.mobile===user.mobile){
            this.appointmentSettings.doctor=user.id;
            
            appointmentFormData.append("doctor", this.appointmentSettings.doctor.toString());
            appointmentFormData.append("start_time_am", this.appointmentSettings.start_time_am+':00');
            appointmentFormData.append("end_time_am", this.appointmentSettings.end_time_am + ':00');
            appointmentFormData.append("start_time_pm", this.appointmentSettings.start_time_pm + ':00');
            appointmentFormData.append("end_time_pm", this.appointmentSettings.end_time_pm + ':00');

            this.clinicService.setDocAppoitnmentSettings(appointmentFormData).subscribe({
              complete:()=>{this.openSnackBar('Successfully added doctor!','OK');
              this.spinner.hide();
            },
            error:(e)=>this.spinner.hide()
            })
          }
          else{
            //
          }
        });
      },
      // error:(e)=>console.log(e)
    },
    );
    this.spinner.hide();
  }

  // searchMobile(event:any){
  //   console.log(event);
  // }

  // addUserAccess(){
  //   console.log('Function works');  
  // }

  //Registering mobile number
   addUserAccess(){
    var userformdata = new FormData();
    this.clinicService.getUserAccessList().subscribe({
      next:(res:any)=>{
        this.userAccessList=res;
        this.userAccessList.forEach((element:any) => {
          if(this.doctor.mobile===element.username){
            this.openSnackBar('Entered mobile number is already registered. Please enter user details to continue!','OK');
            this.btndisabled=true;
          }
          else{
            userformdata.append("username", this.doctor.mobile);
            this.password="drpaw_vet" + this.doctor.mobile;
            userformdata.append("password", this.password);
            this.clinicService.AddUserAccess(userformdata).subscribe({
              complete: () => {
                this.openSnackBar('Successfully registered mobile number!','OK'); 
                this.btndisabled=true; 
              },
              // error: (e) => console.log(e),
            });
          }
        });
      },
      // error:(e)=>console.log(e)
    });   
  }

    //Open snackbar 
    openSnackBar(message: string, action: string) {
      this.snackbar.open(message, action);
    }
}







