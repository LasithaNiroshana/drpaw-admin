import { Component,OnInit,AfterViewInit,ViewChild,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {RefundsService} from '../../common/refunds.service';
import {ConfirmAppRefundsComponent} from './confirm-app-refunds/confirm-app-refunds.component';
import {SpinnerService} from '../../common/spinner.service';

export interface AppointmentInfo {
  id: number;
  clinic: number;
  clinic_name: string;
  doctor: number;
  owner:number;
  animal_id:number;
  mobile:string;
  session:any;
  a_date:string;
  a_time:string;
  status:number;
  a_source:number;
  a_charge:number;
  a_payment:number;
  a_type:number;
  a_sub_type:number;
  appointment_type:string;
  active:number;
  doctor_name:string;
  doctor_mobile:string;
  doctor_speciality:string;
  animal_name:string;
  animal_type:string;
  animal_breed:string;
  pet_age:string;
  pet_gender:string;
  pet_weight:string;
  image:any;
  owner_name:string;
  owner_address:string;
  owner_city:string;
  day:number;
  month:string;
  o_present:number;
  d_amount:number;
  no_show_amount:number;
  no_show:number;
  settlement_ref:number;
  paid_date:any;
  paid_status:number;
  created_on:any;
  transaction_paid_amount:number;
  transaction_id:number;
}

@Component({
  selector: 'app-appointment-refunds',
  templateUrl: './appointment-refunds.component.html',
  styleUrls: ['./appointment-refunds.component.scss']
})

export class AppointmentRefundsComponent implements OnInit,AfterViewInit,AfterContentChecked{

  pendingRefunds:any=[]
  displayedColumns: string[] = ['clinic_name','appointment_status','appointment_subtype','owner_name','mobile','owner_city','created_on','a_date','a_time','a_payment','a_charge','d_amount'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  loading$ = this.spinner.loading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private refundsService:RefundsService,private dialog:MatDialog, private spinner:SpinnerService,private cdr:ChangeDetectorRef, private snackbar:MatSnackBar ){
    this.cdr.detach();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {

     //Get appointment refunds
     this.spinner.show();
     this.refundsService.getUserRefunds().subscribe({
      complete:()=>this.spinner.hide(),
      next:(res:any)=>{
        this.pendingRefunds=res;

      if(this.pendingRefunds.length==0){
        this.openSnackBar('There are no appointment refunds to show!','OK');
      }
      else{
      this.dataSource = new MatTableDataSource(this.pendingRefunds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
   },
   error:(e)=>{
    this.spinner.hide();
    console.log(e);
    this.openSnackBar('Error getting appointment refunds! Please try again.','OK');
   }
     });
  }

  ngOnInit() {}
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openConfirmRefundDialog(){
    this.dialog.open(ConfirmAppRefundsComponent,{
      data:{
        refundAppointments:this.pendingRefunds
      }
    });
  }

  //Open snackbar 
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

}
