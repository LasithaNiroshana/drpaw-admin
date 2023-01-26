import { Component, OnInit,Inject } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppointmentTransactionsComponent} from '../appointment-transactions.component';
import {PaymentService} from '../../../common/payment.service';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

const doc = new jsPDF({
  orientation: "portrait",
  unit: "in",
  format: [8.3, 11.7]
});

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss']
})

export class AppointmentInfoComponent implements OnInit{
  clinics:any;
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  appointmentType:number=0;
  appointmentSource:number=0;
  sortedAppointments:any=[];

  displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time'];

  constructor(public dialogRef:MatDialogRef<AppointmentTransactionsComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private paymentService:PaymentService,private datePipe:DatePipe){
    this.clinics=data.cid;
  this.startDate=data.strtDate; //Starting date
  this.endDate=data.enDate;  //Ending date
  this.appointmentType=data.appType;
  this.appointmentSource=data.appSource;
  }

  ngOnInit(){

    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
  let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

  //Obtaining appointments
    this.paymentService.getPaymentsClinic(strDate,enDate).subscribe((res:any)=>{
      res.forEach((element: any) => {
        if(this.clinics==element.clinic && this.appointmentSource==element.a_source){
          this.sortedAppointments.push(element);
          console.log(this.sortedAppointments);
          console.log(this.sortedAppointments.length);
        }
        else{
          //
        }  
      });
      });
  }

  //Export as excel
  exportExcel(){

    //Passing the table id to worksheet
    let table=document.getElementById('appointment-history');
    const worksheet = XLSX.utils.table_to_sheet(table);

    //Generate workbook and the worksheet
    const workbook:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1')

    //Saving the file
    XLSX.writeFile(workbook,'filename.xlsx');
  }

  //Export PDF
  exportDoc(){
    autoTable(doc, { html: '#appointment-history' })
    doc.save('appointments.pdf');
  }
}
