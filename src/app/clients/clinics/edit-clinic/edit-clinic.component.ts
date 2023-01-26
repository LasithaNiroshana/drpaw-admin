import { Component } from '@angular/core';
import {ClinicService} from '../../../common/clinic.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

//Interface for payment details
export interface ClinicDetails {
  name: string;
  business_registration:string;
  slva_no:string;
  clinic_type:string;
  nic:string;
  address_ln1:string;
  address_ln2:string;
  city:string;
  contact_person:string;
  landline:string;
  mobile: string;
  email:string;
  website:string;
  logo:string;
  active:number;
  bank_name:string;
  account_holder_name:string;
  bank_acc_no:string;
  branch:string;
  branch_code:string;
}

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.scss']
})


export class EditClinicComponent {
  clinic:ClinicDetails={
    name: "",
    business_registration:"",
    slva_no:"",
    clinic_type:"",
    nic:"",
    address_ln1:"",
    address_ln2:"",
    city:"",
    contact_person:"",
    landline:"",
    mobile: "",
    email:"",
    website:"",
    logo:"",
    active:0,
    bank_name:"",
    account_holder_name:"",
    bank_acc_no:"",
    branch:"",
    branch_code:""
  }

  constructor(private clinicService:ClinicService,private snackbar:MatSnackBar,private dialog:MatDialog){}

  //Open snackbar 
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  //Adding a clinic
  onSubmit(formValues: JSON){
    if(
      this.clinic.name!=""
      &&
      this.clinic.address_ln1!=""
      &&
      this.clinic.address_ln2!=""
      &&
      this.clinic.city!=""
      &&
      this.clinic.mobile!=""
      &&
      this.clinic.email!=""
      &&
      this.clinic.website!=""
      &&
      this.clinic.active!=null
      &&
      this.clinic.bank_name!=""
      &&
      this.clinic.account_holder_name!=""
      &&
      this.clinic.branch!=""
      &&
      this.clinic.branch_code!=""
    ){
      this.clinicService.SaveClinic(formValues).subscribe((result: any)=>{
        // console.log(result);
      });
      console.log(formValues);
      this.dialog.closeAll();
      this.openSnackBar('New clinic added successfully','');
    }
    else
     this.openSnackBar('One or more fields missing!','Ok'); 
  }

  cancelConfirm(){
    // this.dialog.open(ConfirmCancelComponent);
  }
  
}
