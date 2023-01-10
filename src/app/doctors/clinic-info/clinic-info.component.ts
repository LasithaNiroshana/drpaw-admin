import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClinicService} from '../../common/clinic.service';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})

export class ClinicInfoComponent implements OnInit{
//Defining clinic
vetclinic:any;
userList:any=[];
displayedColumns: string[] = ['name','mobile','speciality','email','on_leave','direct_vsc','home_vsc','virtual_vsc','user_type','capacity'];

constructor(private router:Router,private clinicService:ClinicService){

      //Obtaining clinic id from doctors component
      this.vetclinic=this.router.getCurrentNavigation()?.extras.state;

}

  ngOnInit(){

    //Subscribing to clinic service and obtaining available users
  this.clinicService.getUsers(this.vetclinic.clinicid).subscribe((res:any)=>{
    this.userList=res;
  })
  }

  addUser(){
    this.router.navigate(['home/adduser']);
  }
}
