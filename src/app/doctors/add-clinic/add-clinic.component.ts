import { Component } from '@angular/core';
import {ClinicService} from '../../common/clinic.service';
import {MatSnackBar} from '@angular/material/snack-bar';

//Interface for payment details
export interface ClinicDetails {
  id:string;
  name: string;
  address:string;
  mobile: string;
  email:string;
  website:string;
  city:string;
  logo:string;
}

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent {
  clinic:ClinicDetails={
    id:'10',
    name: '',
    address: '',
    mobile: '',
    email: '',
    website: '',
    city: '',
    logo: '',
  }

  constructor(private clinicService:ClinicService,private snackbar:MatSnackBar){}

  //Adding a clinic
  addClinic(){
    if(
      this.clinic.name!=''
      &&
      this.clinic.address!=''
      &&
      this.clinic.mobile!=''
      &&
      this.clinic.email!=''
      &&
      this.clinic.website!=''
      &&
      this.clinic.city!=''
    ){
      this.clinicService.SaveClinic(this.clinic);
    }
    else
     this.openSnackBar('One or more fields missing!','Ok'); 
  }

  //Open snackbar 
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }
}
