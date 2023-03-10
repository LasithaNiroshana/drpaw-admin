import { Component,OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {ClinicService} from '../../common/clinic.service';
import {PaymentService} from '../../common/payment.service';
import {SpinnerService} from '../../common/spinner.service';
import { tap } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
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
export class AppointmentTransactionsComponent implements OnInit,AfterViewInit{

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


  displayedColumns: string[] = ['clinic_name','appointment_type','appointment_sub_type','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge','no_show'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe:DatePipe,private clinicService:ClinicService,private appointmentService:PaymentService,private dialog:MatDialog,private spinner:SpinnerService){
    const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 19);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 0);
  }
  ngAfterViewInit() {
    this.getClinicList();
    // this.getAppointments()
    this.appointmentService.getAppointmentList().subscribe((res:any)=>{
       this.appointmentHistory=res;
       this.dataSource = new MatTableDataSource(this.appointmentHistory);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
  }

  ngOnInit() {
  }

    //Get appointment history of all clinics
  getAppointments(){
   
  }

      //Get clinic list
  getClinicList(){
    this.spinner.requestStarted;
     this.clinicService.GetClinics().subscribe((res:any)=>{
        this.clinics=res;
    });
    this.spinner.requestEnded;
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

}
