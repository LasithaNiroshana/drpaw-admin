import { Component, Inject, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClinicService} from '../../../common/clinic.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClinicsComponent} from '../clinics.component';
import {SpinnerService} from '../../../common/spinner.service';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})

export class ClinicInfoComponent implements OnInit,AfterViewInit{
//Defining clinic
userList:any;
displayedColumns: string[] = ['name','mobile','email','on_leave','direct_vsc','home_vsc','virtual_vsc','user_type'];
clinicID:any;
clinicName:string='';

loading$ = this.spinner.loading$;

constructor(private router:Router,private clinicService:ClinicService,private dialogRef:MatDialogRef<ClinicsComponent>,@Inject(MAT_DIALOG_DATA) private data:any, private spinner:SpinnerService){

      //Obtaining clinic id from doctors component
      this.userList=data.userListData;
      this.clinicID=data.cid;
      this.clinicName=data.name;

}
  ngAfterViewInit() {
      //Subscribing to clinic service and obtaining available users
  this.clinicService.getClinicUsers(this.clinicID).subscribe({
    complete:()=>this.spinner.hide(),
    next:(res:any)=>{
      this.userList=res;
    },
    error:(e)=>{this.spinner.hide()},
  });
  }

  ngOnInit(){}

}
