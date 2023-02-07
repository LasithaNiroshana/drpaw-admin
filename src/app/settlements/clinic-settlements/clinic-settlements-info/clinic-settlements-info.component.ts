import { Component,OnInit,Inject } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PaymentService} from '../../../common/payment.service';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SettlementsComponent } from '../../settlements.component';

const doc = new jsPDF({
  orientation: "landscape",
  unit: "in",
  format: [8.3, 11.7]
});

@Component({
  selector: 'app-clinic-settlements-info',
  templateUrl: './clinic-settlements-info.component.html',
  styleUrls: ['./clinic-settlements-info.component.scss']
})

export class ClinicSettlementsInfoComponent implements OnInit{
  clinics:any;
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  appointmentType:number=0;
  appointmentSource:number=0;
  sortedAppointments:any=[];
  appointmentStatus:number=0;

  displayedColumns: string[] = ['appointment_id','clinic_id','clinic_name','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge','settlement_status','settled_date'];

  constructor(public dialogRef:MatDialogRef<SettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private settlementsService:PaymentService,private datePipe:DatePipe){
    this.clinics=data.cid;
    this.appointmentStatus=data.appStatus;
  this.startDate=data.strtDate; //Starting date
  this.endDate=data.enDate;  //Ending date
  // this.appointmentType=data.appType;
  this.appointmentSource=data.appSource;
  }

  ngOnInit() {
     //Converting starting and end dates
     let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
     let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;
   
     //Obtaining appointments
       this.settlementsService.getPaymentsClinic(strDate,enDate).subscribe((res:any)=>{
         res.forEach((element: any) => {
           if(this.clinics==element.clinic && this.appointmentSource==element.a_source && this.appointmentStatus==element.status){
             this.sortedAppointments.push(element);
           }
           else{
             //
           }  
         });
         });
    
  }

  //Export as excel
  exportExcel(){

    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

   //Passing the table id to worksheet
   let table=document.getElementById('appointment-history');
   const worksheet = XLSX.utils.table_to_sheet(table);

   //Generate workbook and the worksheet
   const workbook:XLSX.WorkBook=XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1')

   //Saving the file
   XLSX.writeFile(workbook,'ClinicID'+'_'+this.clinics+'_'+'from'+'_'+strDate+'_'+'to'+'_'+enDate+'_'+'appointments.xlsx');
 }

 //Export PDF
 exportDoc(){
   
    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

   autoTable(doc, { html: '#appointment-history' })
   doc.save('ClinicID'+'_'+this.clinics+'_'+'from'+'_'+strDate+'_'+'to'+'_'+enDate+'_'+'appointments.pdf');
 }
}
