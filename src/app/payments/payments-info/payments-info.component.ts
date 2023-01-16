import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {PaymentService} from '../../common/payment.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatSnackBar} from '@angular/material/snack-bar';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

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

//Autotable pdf document parameters
const doc = new jsPDF({
  orientation: "landscape",
  unit: "in",
  format: [8.3, 11.7]
});

@Component({
  selector: 'app-payments-info',
  templateUrl: './payments-info.component.html',
  styleUrls: ['./payments-info.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})

export class PaymentsInfoComponent implements OnInit{
  clinicID:any;  //ClinicID
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  minDate1: Date; //minDate
  maxDate1: Date; //maxDate
  minDate2: Date; //minDate
  maxDate2: Date; //maxDate
  totalOnlineCharge:any;
  totalOfflineCharge:any;
  totalDrpawCharge:any;
  vetsCharge:any;
  drpawCharge:any;
  settlement:any;

  //Table data
  paymentHistory:any=[];
  displayedColumns: string[] = ['clinic_name','doctor_name','appointment_type','appointment_subtype','animal_name','animal_type','owner_name','mobile','owner_address','owner_city','a_date','a_time'];

constructor(private paymentService:PaymentService, private datePipe:DatePipe,private snackbar:MatSnackBar){
  const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 15);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 16);
}

//Obtain payment history of the clinic
getPaymentHistory(clinicid:any,stdt:any,endt:any){
  if(this.startDate!=null && this.endDate!=null){
    let strDate:string = this.datePipe.transform(stdt, 'yyyy-MM-dd') as string;
  let enDate:string = this.datePipe.transform(endt, 'yyyy-MM-dd') as string;
  this.paymentService.getPaymentsClinic(strDate,enDate).subscribe((res:any)=>{
    res.forEach((element: any) => {
      if(clinicid==element.clinic){
        this.paymentHistory.push(element);
      }
        // console.log(element.status);
      let minus=0;
      let plus=0
       if(element.a_source==1){
        minus = minus + element.a_payment;
        this.vetsCharge=minus;
       }
        else{
        plus=plus + element.a_charge
        this.drpawCharge=plus;
        }
        this.settlement=this.drpawCharge-this.vetsCharge;
    });
    console.log(this.paymentHistory.length);
    console.log(this.paymentHistory);
  });
  }
  else{
    this.openSnackBar('Please enter Clinic ID/Starting Date/Ending Date','OK');
  }
  
}

ngOnInit(){}

//Open snackbar 
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

resetForm(){
  this.clinicID==null || this.startDate==null || this.endDate==null; 
}


  //Download pdf
  downloadDoc(){
    autoTable(doc, { html: '#paymentHistory' })
    doc.save('payment.pdf');
    }

}
