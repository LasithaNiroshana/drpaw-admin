import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent {
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
  constructor(private dialog:MatDialog){}

  onSubmit(userId:any){}
  cancelConfirm(){}
  closeAll(){
    this.dialog.closeAll();
  }
}