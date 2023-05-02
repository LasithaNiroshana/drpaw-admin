import { Component,ViewChild,OnInit,AfterViewInit,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import { Router, TitleStrategy, UrlCreationOptions } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClinicService} from '../../common/clinic.service';
import { MatDialog } from '@angular/material/dialog';
import {ClinicInfoComponent} from './clinic-info/clinic-info.component';
import {EditClinicComponent} from './edit-clinic/edit-clinic.component';
import {AddUserComponent} from '../clinics/add-user/add-user.component';
import {SpinnerService} from '../../common/spinner.service';
import {GlobalService} from '../../common/global.service';

//Interface for payment details
export interface ClinicDetails {
  id:number;
  name: string;
  clinic_type:string;
  nic:string;
  address:string;
  city:string;
  logo:string;
  active:number;
  created_on:string;
  province:string;
  district:string;
  br_no:string;
  contact_person:string;
  landline:string;
  mobile: string;
  email:string;
  website:string;
  bank_name:string;
  bank_acc_holder:string;
  bank_acc_no:string;
  bank_branch:string;
  bank_branch_code:string;
  sale:number;
}

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit,AfterViewInit,AfterContentChecked{
  isChecked = "";
  clinicList:any=[];
  displayedColumns: string[] = ['logo','clinicID','clinicName','address','city','businessReg','contactPerson','landline','mobile','email','website','accHolder','bankName','accNo','branch','branchCode','onboarded_by','active','info','edit'];
  activeClinics:number=0;
  clinicsCount:number=0;
  dataSource: MatTableDataSource<ClinicDetails> = new MatTableDataSource();

  loading$ = this.spinner.loading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userList:any=[];

  // activeClinicsCountStopper:any = setInterval(()=>{
  //   this.clinicsCount++;
  //   if(this.clinicsCount==this.clinicList.length){
  //     clearInterval(this.activeClinicsCountStopper);
  //   }
  // },5000);

  constructor(private router:Router,private clinicService:ClinicService,private dialog:MatDialog, private cdr:ChangeDetectorRef,private spinner:SpinnerService,private snackbar:MatSnackBar, public globalService:GlobalService){
    this.cdr.detach();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngAfterViewInit(){
  
    // this.getClinics();
    this.spinner.show();
    this.clinicService.GetClinics().subscribe({
      complete:()=>this.spinner.hide(),
      next:(res:any)=>{
        this.clinicList=res;
        console.log(this.clinicList);
        if(this.clinicList.length==0){
          this.openSnackBar('There are no clinics to show!','OK');
        }
        else{
        this.dataSource = new MatTableDataSource(this.clinicList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        res.forEach((element:any) => {
          if(element.active==0){
            this.activeClinics=this.activeClinics+1;
          }
        });
        }
      },
      error:(e)=>{
      this.openSnackBar('Error getting clincis! Please try agian.','OK');
      this.spinner.hide();
      }
    });
    
  }

  ngOnInit(){
    // console.log(this.globalService.token);
  }

  pageNavigate(){
    this.router.navigate(['home/petowners']);
  }

  //Edit Clinic
  editClinic(cl:any){
    this.dialog.open(EditClinicComponent,{data:{
      clinic:cl
    }});
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

   //Open snackbar 
   openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

}
