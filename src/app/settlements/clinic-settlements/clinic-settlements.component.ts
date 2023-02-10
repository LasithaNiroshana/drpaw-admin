import { Component,OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ClinicService} from '../../common/clinic.service';
import {PaymentService} from '../../common/payment.service';
import {ClinicSettlementsInfoComponent} from './clinic-settlements-info/clinic-settlements-info.component';
import {UpdateClinicSettlementsComponent} from '../clinic-settlements/update-clinic-settlements/update-clinic-settlements.component';

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
  selector: 'app-clinic-settlements',
  templateUrl: './clinic-settlements.component.html',
  styleUrls: ['./clinic-settlements.component.scss']
})
export class ClinicSettlementsComponent implements OnInit{

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

  displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];

  constructor(private dialog:MatDialog,private clinicService:ClinicService, private paymentService:PaymentService,private datepipe:DatePipe){
    const currentYear = new Date().getFullYear();
    //Setting up minimum and maximum dates for calendars
      this.minDate1 = new Date(currentYear - 1, 0, 1);
      this.maxDate1 = new Date(currentYear - 0, 0, 19);
      this.minDate2 = new Date(currentYear - 1, 0, 1);
      this.maxDate2 = new Date(currentYear - 0, 0, 0);
  }

  ngOnInit() {
    this.getClinicList();
    this.getAppointmentList();
    
  }

   //Get appointment history of a clinic
   getAppointmentHistory(clinicid:string,appointmentSource:number,stdt:any,endt:any){
    this.dialog.open(ClinicSettlementsInfoComponent,{
      data:{
        cid:clinicid,
        appSource:appointmentSource,
        strtDate:stdt,
        enDate:endt
      }
    });
    }

    
    uploadSettlements(){
      this.dialog.open(UpdateClinicSettlementsComponent);
    }

  //Reset form
  resetForm(){}

       //Get clinic list
  async getClinicList(){
     this.clinicService.GetClinics().subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.clinics.push(element);
      });
    });
  }

    //Get appointment history of all clinics
  getAppointmentList(){
     this.paymentService.getAppointmentList().subscribe((res:any)=>{
      this.appointmentHistory=res;
      // console.log(this.appointmentHistory);
      // this.appointmentHistory.paginator=this.paginator;
    });
  }
}
