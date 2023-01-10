import { Component } from '@angular/core';
import {ClinicService} from '../../common/clinic.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmCancelComponent} from '../../doctors/confirm-cancel/confirm-cancel.component';
//Interface for payment details
export interface ClinicDetails {
  name: string;
  address:string;
  mobile: string;
  email:string;
  website:string;
  city:string;
  logo:string;
  active:number;
}

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent {
  clinic:ClinicDetails={
    name: "",
    address: "",
    mobile: "",
    email: "",
    website: "",
    city: "",
    logo: "",
    active:0
  }

  constructor(private clinicService:ClinicService,private snackbar:MatSnackBar,private dialog:MatDialog){}

  //Adding a clinic
  // addClinic(formValues: JSON){
  //   if(
  //     this.clinic.name!=""
  //     &&
  //     this.clinic.address!=""
  //     &&
  //     this.clinic.mobile!=""
  //     &&
  //     this.clinic.email!=""
  //     &&
  //     this.clinic.website!=""
  //     &&
  //     this.clinic.city!=""
  //   ){
  //     this.clinicService.SaveClinic(this.clinic).subscribe(res=>{
  //       console.log(res);
  //     })
  //   }
  //   else
  //    this.openSnackBar('One or more fields missing!','Ok'); 
  // }

  //Open snackbar 
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  onSubmit(formValues: JSON){
    if(
      this.clinic.name!=""
      &&
      this.clinic.address!=""
      &&
      this.clinic.mobile!=""
      &&
      this.clinic.email!=""
      &&
      this.clinic.website!=""
      &&
      this.clinic.city!=""
      &&
      this.clinic.active!=null
    ){
      this.clinicService.SaveClinic(formValues).subscribe((result: any)=>{
      });
      // console.log(formValues);
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
