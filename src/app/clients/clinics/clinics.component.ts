import { Component,ViewChild,OnInit } from '@angular/core';
import { Router, TitleStrategy, UrlCreationOptions } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {ClinicService} from '../../common/clinic.service';
import { MatDialog } from '@angular/material/dialog';
import {ClinicInfoComponent} from './clinic-info/clinic-info.component';
import {EditClinicComponent} from './edit-clinic/edit-clinic.component';


@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit{
  isChecked = "";
  clinicList:any=[];
  displayedColumns: string[] = ['logo','clinicName','address','city','businessReg','slvaNum','contactPerson','landline','mobile','email','website','accHolder','bankName','accNo','branch','branchCode','active','info','edit'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)!
  sort!: MatSort;
  userList:any=[];


  constructor(private router:Router,private clinicService:ClinicService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.clinicService.GetClinics().subscribe(res=>{
      this.clinicList=res;
      console.log(this.clinicList);
    });
  }

  pageNavigate(){
    this.router.navigate(['home/petowners']);
  }

  //Edit Clinic
  editClinic(id:any){
    this.dialog.open(EditClinicComponent);
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
