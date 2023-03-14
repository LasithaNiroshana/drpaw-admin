import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClinicService} from '../../../common/clinic.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DoctorsComponent} from '../../../doctors/doctors.component';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})

export class ClinicInfoComponent implements OnInit{
//Defining clinic
userList:any;
displayedColumns: string[] = ['name','mobile','speciality','email','on_leave','direct_vsc','home_vsc','virtual_vsc','user_type','capacity'];
clinicID:any;
clinicName:string='';

constructor(private router:Router,private clinicService:ClinicService,private dialogRef:MatDialogRef<DoctorsComponent>,@Inject(MAT_DIALOG_DATA) private data:any){

      //Obtaining clinic id from doctors component
      this.userList=data.userListData;
      this.clinicID=data.cid;
      this.clinicName=data.name;

}

  ngOnInit(){
     //Subscribing to clinic service and obtaining available users
  this.clinicService.getClinicUsers(this.clinicID).subscribe((res:any)=>{
    this.userList=res;
    console.log(this.userList);
  });
  }

}
