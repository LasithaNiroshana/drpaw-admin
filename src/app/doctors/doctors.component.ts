import { Component,ViewChild,OnInit } from '@angular/core';
import { Router, TitleStrategy, UrlCreationOptions } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {ClinicService} from '../common/clinic.service';
import { MatDialog } from '@angular/material/dialog';
import { ClinicInfoComponent } from './clinic-info/clinic-info.component';

//Interface for payment details
// export interface ClinicDetails {
//   clinicName: string;
//   address:string;
//   mobile: string;
//   email:string;
//   website:string;
//   city:string;
//   logo:string;
//   active:boolean;
// }

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit{

  clinicList:any=[];
  displayedColumns: string[] = ['logo','clinicName','address','city','businessReg','slvaNum','contactPerson','landline','mobile','email','website','accHolder','bankName','accNo','branch','branchCode','active','info','edit'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)!
  sort!: MatSort;
  userList:any=[];

  constructor(private router:Router,private clinicService:ClinicService,private dialog:MatDialog){}

  //getting clinics on component initialization
  ngOnInit(){
    this.clinicService.GetClinics().subscribe(res=>{
      this.clinicList=res;
      // console.log(this.clinicList);
    });
  }

  pageNavigate(){
    this.router.navigate(['home/petowners']);
  }

  //Edit Clinic
  editClinic(id:any){
    
  }

  //More Info
  // moreInfo(clinic:string){
  //   this.clinicService.getUsers(clinic).subscribe(res=>{
  //     this.router.navigate(['home/clinicinfo'],{state:{clinicid:clinic}});
  //   });
  // }

  // clickMoreInfo(clinic:string){
  //   this.dialog.open(ClinicInfoComponent,{data:})
  // }

  //More Info
  moreInfo(clinicID:string,clinicName:string){
      //Subscribing to clinic service and obtaining available users
  this.clinicService.getUsers(clinicID).subscribe((res:any)=>{
    this.userList=res;
    // console.log(this.userList);
  });
    this.dialog.open(ClinicInfoComponent,{
      data:{
        userListData:this.userList,
        name:clinicName
      }
    });
   
  }

}
