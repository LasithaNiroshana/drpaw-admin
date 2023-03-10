import { Component,OnInit,AfterContentInit, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClinicService} from '../../../common/clinic.service';

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
  clinicList:any=[];
  clinicListID:any=[];
  password:string="";
  btndisabled=true;

  clinicUsers:any=[];
  userAccessList:any=[];

  constructor(private dialog:MatDialog,private clinicService:ClinicService,private snackbar:MatSnackBar){}

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

  onSubmit(){
    this.clinicService.getUserAccessList().subscribe((res:any)=>{
      this.userAccessList=res;
      this.userAccessList.forEach((element:any) => {
        if(this.doctor.mobile===element.username){
        this.doctor.login=element.id;
        }
        else{
          //
        }
      });
    });  
    
  }

  // onSubmit(){
  //   var formdata = new FormData();

  //   this.clinicService.getUserAccessList().subscribe((res:any)=>{
  //     this.userAccessList=res;
  //     this.userAccessList.forEach((element:any) => {
  //       if(this.doctor.mobile===element.username){
  //         this.doctor.login=element.username
  //         console.log(this.doctor.login);
  //       }
  //       else{
  //         //
  //       }
  //     });
  //   });  

   
  //   this.clinicListID.forEach((element:any) => {
  //     if(this.doctor.clinic===element.id){
  //       this.doctor.clinic_name=element.name;
  //       this.doctor.clinic_mobile=element.mobile;
  //     }
  //     else{
  //       //
  //     }
  //   });
    
  //   formdata.append("name", this.doctor.name);
  //   formdata.append("clinic", this.doctor.clinic.toString());
  //   formdata.append("login", this.doctor.login.toString());
  //   formdata.append("mobile", this.doctor.mobile);
  //   formdata.append("email", this.doctor.email);
  //   formdata.append("address", this.doctor.address);
  //   formdata.append("city", this.doctor.city);
  //   formdata.append("website", this.doctor.website);
  //   formdata.append("clinic_name", this.doctor.clinic_name);
  //   formdata.append("clinic_address", this.doctor.clinic_address);
  //   formdata.append("clinic_mobile", this.doctor.clinic_mobile);
  //   formdata.append("support_direct_visit", this.doctor.support_direct_visit.toString());
  //   formdata.append("support_home_visit", this.doctor.support_home_visit.toString());
  //   formdata.append("support_virtual_visit", this.doctor.support_virtual_visit.toString());
  //   formdata.append("direct_visit_service_charge", this.doctor.direct_visit_service_charge.toString());
  //   formdata.append("home_visit_service_charge", this.doctor.home_visit_service_charge.toString());
  //   formdata.append("virtual_visit_service_charge", this.doctor.virtual_visit_service_charge.toString());
  //   formdata.append("user_type", this.doctor.user_type.toString());
  //   formdata.append("is_sms", this.doctor.is_sms.toString());
  //   formdata.append("slva_reg_no", this.doctor.slva_reg_no);

  //   if(
  //     this.btndisabled=true
  //     &&
  //     this.doctor.name!=""
  //     &&
  //     this.doctor.clinic!=null
  //     &&
  //     this.doctor.mobile!=""
  //     &&
  //     this.doctor.email!=""
  //     &&
  //     this.doctor.address!=""
  //     &&
  //     this.doctor.city!=""
  //     // &&
  //     // this.doctor.clinic_name!=""
  //     // &&
  //     // this.doctor.clinic_address!=""
  //     // &&
  //     // this.doctor.clinic_mobile!=""
  //     &&
  //     this.doctor.direct_visit_service_charge!=null
  //     &&
  //     this.doctor.home_visit_service_charge!=null
  //     &&
  //     this.doctor.virtual_visit_service_charge!=null
  //   ){
  //     this.clinicService.AddUser(formdata).subscribe((result:any)=>{});
  //   this.dialog.closeAll();
  //   this.snackbar.open("New user has been added successfully","OK");
  //   }
  //   else{
  //     this.snackbar.open("One or more fields missing! Please check the form again.","OK");
  //   }
    
  // }


  cancelConfirm(){}
  closeAll(){
    this.dialog.closeAll();
  }

  //Searching the entered mobile number already exist 
  searchMobile(event:any){
   if(event.length==10){
    this.clinicService.getAllUsers().subscribe((res:any)=>{
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
    });
   }
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
    this.clinicService.getUserAccessList().subscribe((res:any)=>{
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
          this.clinicService.AddUserAccess(userformdata).subscribe((res:any)=>{
            });
          this.openSnackBar('Successfully registered mobile number!','OK'); 
          this.btndisabled=true; 
        }
      });
    });   
  }

    //Open snackbar 
    openSnackBar(message: string, action: string) {
      this.snackbar.open(message, action);
    }
}
