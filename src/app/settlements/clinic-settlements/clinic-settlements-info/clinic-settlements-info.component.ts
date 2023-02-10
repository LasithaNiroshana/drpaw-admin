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

//Interface for payment details
export interface AppointmentDetails {
  id: any,
  clinic: any,
  clinic_name: string,
  doctor: any,
  owner: any,
  animal_id: any,
  mobile: string,
  session: any,
  a_date: string,
  a_time: string,
  status: any,
  a_source: any,
  a_charge: any,
  a_payment: any,
  a_type: any,
  a_sub_type: any,
  appointment_type: string,
  active: any,
  doctor_name: string,
  doctor_mobile: string,
  doctor_speciality: string,
  animal_name: string,
  animal_type: string,
  animal_breed: string,
  pet_age: any,
  pet_gender: string,
  pet_weight: any,
  image: string,
  owner_name: string,
  owner_address: string,
  owner_city: string,
  day: any,
  month: string,
  o_present: any,
  d_amount: any,
  no_show_amount: any,
  no_show: any,
  settlement_ref: any,
  paid_date: any,
  paid_status: any
}

@Component({
  selector: 'app-clinic-settlements-info',
  templateUrl: './clinic-settlements-info.component.html',
  providers: [DatePipe],
  styleUrls: ['./clinic-settlements-info.component.scss']
})

export class ClinicSettlementsInfoComponent implements OnInit{
  clinics:any;
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  appointmentType:number=0;
  appointmentSource:number=0;
  sortedAppointments:any=[];
  appointmentStatus=2; //Default completed appointments
  currentDateTime:any;
  activeStatus:number=1;
  referenceId:any;
  appoitmentId:any;

  displayedColumns: string[] = ['appointment_id','clinic_id','clinic_name','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge','settlement_status','settled_date'];

  appointment:AppointmentDetails={
  id: null,
  clinic: null,
  clinic_name: "",
  doctor: null,
  owner: null,
  animal_id: null,
  mobile: "",
  session: null,
  a_date: "",
  a_time: "",
  status: null,
  a_source: null,
  a_charge: null,
  a_payment: null,
  a_type: null,
  a_sub_type: null,
  appointment_type: "",
  active: null,
  doctor_name: "",
  doctor_mobile: "",
  doctor_speciality: "",
  animal_name: "",
  animal_type: "",
  animal_breed: "",
  pet_age: null,
  pet_gender: "",
  pet_weight: null,
  image: "",
  owner_name: "",
  owner_address: "",
  owner_city: "",
  day: null,
  month: "",
  o_present: null,
  d_amount: null,
  no_show_amount: null,
  no_show: null,
  settlement_ref: null,
  paid_date: null,
  paid_status: null
  }

  constructor(public dialogRef:MatDialogRef<SettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private settlementsService:PaymentService,private datePipe:DatePipe,public datepipe: DatePipe){
    this.clinics=data.cid;
    this.startDate=data.strtDate; //Starting date
    this.endDate=data.enDate;  //Ending date
    // this.appointmentType=data.appType;
    this.appointmentSource=data.appSource;
  }

  ngOnInit() {
     //Converting starting and end dates
     let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
     let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;
   this.getAppointmentsList(this.clinics,strDate,enDate)
    
  }

   //Obtaining appointments
  async getAppointmentsList(clinicId:any,startDate:any,endDate:any){
     if(this.appointmentSource!=2){
      this.settlementsService.getPaymentsClinic(clinicId,startDate,endDate).subscribe((res:any)=>{
        res.forEach((element: any) => {
          if(this.appointmentSource==element.a_source && this.activeStatus==element.active){
          //  console.log(element.status);
          //  console.log(element.active);
            this.sortedAppointments.push(element);
          }
          else{
            //
          }  
        });
        });
     }
     else{
      this.settlementsService.getPaymentsClinic(clinicId,startDate,endDate).subscribe((res:any)=>{
        res.forEach((element: any) => {
          if(this.activeStatus==element.active){
            console.log(element.a_source);
          //  console.log(element.status);
          //  console.log(element.active);
            this.sortedAppointments.push(element);
          }
          else{
            //
          }  
        });
        });
     }
     return this.sortedAppointments;
  }

  //Export as excel
  exportExcel(){

    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

    this.currentDateTime =this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');
    console.log(this.currentDateTime);
    
    // this.sortedAppointments.forEach(element => {
    //   this.settlementsService.generateSettlementReferenceId(this.appoitmentId,this.referenceId,this);
    // });
    console.log(this.referenceId);
    console.log(this.sortedAppointments);
    this.sortedAppointments.forEach((element:any) => {
      this.referenceId = 'drc_'+ element.id + '_' + this.currentDateTime;
      this.settlementsService.generateSettlementReferenceId(element.id,this.referenceId,);
    });
  

   //Passing the table id to worksheet
  //  let table=document.getElementById('appointment-history');
  //  const worksheet = XLSX.utils.table_to_sheet(table);

   const worksheet = XLSX.utils.json_to_sheet(this.sortedAppointments)

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
