import { Component,ViewChild,OnInit,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { Router, TitleStrategy, UrlCreationOptions } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {ClinicService} from '../../common/clinic.service';
import { MatDialog } from '@angular/material/dialog';
import {ClinicInfoComponent} from './clinic-info/clinic-info.component';
import {EditClinicComponent} from './edit-clinic/edit-clinic.component';
import {AddUserComponent} from '../clinics/add-user/add-user.component';
import {SpinnerService} from '../../common/spinner.service';

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
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit,AfterViewInit{
  isChecked = "";
  clinicList:any=[];
  displayedColumns: string[] = ['logo','clinicID','clinicName','address','city','businessReg','slvaNum','contactPerson','landline','mobile','email','website','accHolder','bankName','accNo','branch','branchCode','onboarded_by','active','info','edit'];
  activeClinics:number=0;
  dataSource: MatTableDataSource<ClinicDetails> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userList:any=[];


  constructor(private router:Router,private clinicService:ClinicService,private dialog:MatDialog, private cdr:ChangeDetectorRef,private spinner:SpinnerService){}
  ngAfterViewInit(){
    
    // this.getClinics();
    this.clinicService.GetClinics().subscribe((res:any)=>{
      this.clinicList=res;
      this.dataSource = new MatTableDataSource(this.clinicList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      res.forEach((element:any) => {
        if(element.active==0){
          this.activeClinics=this.activeClinics+1;
        }
      });
    });
  
  }

  ngOnInit(){}

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
     
    this.dialog.open(ClinicInfoComponent,{
      data:{
        userListData:this.userList,
        name:clinicName,
        cid:clinicID
      }
    });
   
  }

  openAddUser(){
    // this.dialog.closeAll();
    this.dialog.open(AddUserComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
