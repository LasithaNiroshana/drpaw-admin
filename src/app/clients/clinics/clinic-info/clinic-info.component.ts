import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClinicService} from '../../../common/clinic.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DoctorsComponent} from '../../../doctors/doctors.component';
import { Dialog } from '@angular/cdk/dialog';
import {AddUserComponent} from '../add-user/add-user.component';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})

export class ClinicInfoComponent implements OnInit{
//Defining clinic
userList:any;
displayedColumns: string[] = ['name','mobile','speciality','email','on_leave','direct_vsc','home_vsc','virtual_vsc','user_type','capacity'];

constructor(private router:Router,private clinicService:ClinicService,private dialogRef:MatDialogRef<DoctorsComponent>,@Inject(MAT_DIALOG_DATA) private data:any,private dialog:Dialog){

      //Obtaining clinic id from doctors component
      this.userList=data;

}

  ngOnInit(){}

  // addUser(){
  //   this.dialog.closeAll();
  //   this.dialog.open(AddUserComponent);
  // }
}
