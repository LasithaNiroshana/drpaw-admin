import { Component,OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import {ClinicService} from '../../common/clinic.service';
import {PaymentService} from '../../common/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentInfoComponent} from './appointment-info/appointment-info.component';

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
export class AppointmentTransactionsComponent implements OnInit{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  clinics:any;
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


  displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];
  constructor(private datePipe:DatePipe,private clinicService:ClinicService,private appointmentService:PaymentService,private cdr:ChangeDetectorRef,private dialog:MatDialog){
    const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 19);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 0);
  }

  ngOnInit() {
    this.cdr.detectChanges();

    //Get clinic list
    this.clinicService.GetClinics().subscribe((res:any)=>{
      // res.forEach((element:any) => {
      //   this.clinic=element;
      // });
      this.clinics=res;
    });

    //Get appointment history of all clinics
    this.appointmentService.getAppointmentList().subscribe((res:any)=>{
      this.appointmentHistory=res;
      // console.log(this.appointmentHistory);
      this.appointmentHistory.paginator=this.paginator;
    });
  }

  

  //Get appointment history of a clinic
  getAppointmentHistory(clinicid:number,appointmentSource:number,stdt:any,endt:any){
  this.dialog.open(AppointmentInfoComponent,{
    data:{
      cid:clinicid,
      // appType:appointmentType,
      appSource:appointmentSource,
      strtDate:stdt,
      enDate:endt
    }
  });
  }

  //Reset form
  resetForm(){}

}
