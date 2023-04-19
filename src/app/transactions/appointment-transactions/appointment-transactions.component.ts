import { Component,OnInit,ViewChild,AfterViewInit,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {ClinicService} from '../../common/clinic.service';
import {PaymentService} from '../../common/payment.service';
import {SpinnerService} from '../../common/spinner.service';
import { tap } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppointmentInfoComponent} from './appointment-info/appointment-info.component';

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

//Creating and exporting custom date format
export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-appointment-transactions',
  templateUrl: './appointment-transactions.component.html',
  styleUrls: ['./appointment-transactions.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class AppointmentTransactionsComponent implements OnInit,AfterViewInit,AfterContentChecked{

  clinics:any=[];
  appointmentHistory:any=[];
  clinicID:any;  //ClinicID
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  minDate1: Date; //minDate
  maxDate1: Date; //maxDate
  minDate2: Date; //minDate
  maxDate2: Date; //maxDate
  appointmentType:number=0;
  appointmentSource:number=0;
  appointmentStatus:number=0;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  displayedColumns: string[] = ['clinic_name','appointment_source','appointment_status','appointment_sub_type','owner_address','mobile','created_on','a_date','a_time','a_payment','a_charge','no_show_amount'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading$ = this.spinner.loading$;

  constructor(private datepipe:DatePipe,private clinicService:ClinicService,private appointmentService:PaymentService,private dialog:MatDialog,private spinner:SpinnerService, private cdr:ChangeDetectorRef, private snackbar:MatSnackBar){
    const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 19);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 0);


    this.cdr.detach();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    let startday = new Date();
    startday.setDate(startday.getDate() - 14);
    let  startDate:string = this.datepipe.transform(startday, 'yyyy-MM-dd') as string;

    let endday = new Date();
    endday.setDate(endday.getDate()+14);
    let  endDate:string = this.datepipe.transform(endday, 'yyyy-MM-dd') as string;
    
    // this.getAppointments()
    this.spinner.show();
    
    this.appointmentService.getAppointmentList(startDate,endDate).subscribe({
      complete:()=>this.spinner.hide(),
      next:(res:any)=>{
        this.appointmentHistory=res;
        console.log(this.appointmentHistory);
        if(this.appointmentHistory==0){
          this.openSnackBar('There are no appointments to show!','OK');
        }
        else{
        this.dataSource = new MatTableDataSource(this.appointmentHistory);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
      },
      error:(e)=>{this.spinner.hide();
        console.log(e);
      this.openSnackBar('Error getting appointments! Please try again.','OK');
      }
    });
    // this.spinner.hide();
  }

  ngOnInit() {}


    //Get appointment history of all clinics
  getAppointments(){
   
  }

  //Get appointment history of a clinic
  getAppointmentHistory(clinicid:number,appointmentStatus:number,appointmentSource:number,appointmentType:number,stdt:any,endt:any){
  this.dialog.open(AppointmentInfoComponent,{
    data:{
      cid:clinicid,
      appStatus:appointmentStatus,
      appSource:appointmentSource,
      appType:appointmentType,
      strtDate:stdt,
      enDate:endt
    }
  });
  }

  //Reset form
  resetForm(){}

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

  displayFn(clinicName:any){
    return clinicName?clinicName.clinic_name:undefined;
  }

}
