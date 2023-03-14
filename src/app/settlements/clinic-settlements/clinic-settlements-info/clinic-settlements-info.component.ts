import { Component,OnInit,Inject,AfterViewInit,ViewChild } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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
  selector: 'app-clinic-settlements-info',
  templateUrl: './clinic-settlements-info.component.html',
  providers: [DatePipe],
  styleUrls: ['./clinic-settlements-info.component.scss']
})

export class ClinicSettlementsInfoComponent implements OnInit,AfterViewInit{
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
  clinicSettlementList:any=[];
  // clinicSettlementTotal:number=0;

  current_clinic = 0;
  prev_clinic = 0;

  clinic_total = 0;
  clinic_settlement:any = [];
  clinicAppointments:any=[];

  displayedColumns: string[] = ['clinic_name','appointment_type','appointment_sub_type','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge','no_show'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  trans_pre = "drc";

 

  appointment_list = [];

  constructor(public dialogRef:MatDialogRef<SettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private settlementsService:PaymentService,private datePipe:DatePipe,public datepipe: DatePipe){
    // this.clinics=data.cid;
    this.startDate=data.strtDate; //Starting date
    this.endDate=data.enDate;  //Ending date
    // this.appointmentType=data.appType;
    // this.appointmentSource=data.appSource;
    this.clinicAppointments=data.appointmentsList;
    this.dataSource = new MatTableDataSource(this.clinicAppointments);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(){
     //Converting starting and end dates
     let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
     let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;
  //  this.getAppointmentsList(strDate,enDate);
  }

  ngOnInit() {}

   //Obtaining appointments
  // async getAppointmentsList(startDate:any,endDate:any){
  //   this.currentDateTime =this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');
  //    if(this.appointmentSource==0){
  //     this.settlementsService.getAppointmentListfromDates(startDate,endDate).subscribe((res:any)=>{
  //       this.sortedAppointments=res;
  //     });
      
  //    }
  //    else{
  //     //
  //    }
  // }

  //Export as excel
  exportExcel(){

    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

    var result = this.sortedAppointments;

    if(result.length > 0){
      this.current_clinic = result[0]['clinic'];
      this.prev_clinic = result[0]['clinic'];

      var uid = (Math.floor(Date.now() / 1000)).toString();
      // appointment referece code
      var s_ref = "none";

      // console.log(result.length);

      for(var i = 0; result.length > i; i++){
        this.current_clinic = result[i]['clinic'];
        s_ref = this.trans_pre + "_" + this.prev_clinic.toString() + "_" + uid;
        
        if(this.current_clinic === this.prev_clinic){
          this.clinic_total += result[i]['a_payment'];

          // update appointment refernceid
          this.settlementsService.generateSettlementReferenceId(result[i]['id'],s_ref);
          // your_update_function(esult[i]['id'], s_ref);
        }else{
          this.clinic_settlement.push({
            "clinic" : this.prev_clinic,
            "settlement" : this.clinic_total,
            "settlement_ref": s_ref
          });

          this.clinic_total = 0;
          this.clinic_total += result[i]['a_payment'];

          // update appointment refernceid
          this.settlementsService.generateSettlementReferenceId(result[i]['id'],s_ref);
          // your_update_function(esult[i]['id'], s_ref);
        }

        this.prev_clinic = this.current_clinic;
      }

      this.clinic_settlement.push({
        "clinic" : this.prev_clinic,
        "settlement" : this.clinic_total,
        "settlement_ref": s_ref
      });

      // update appointment refernceid
      this.settlementsService.generateSettlementReferenceId(result[result.length - 1]['id'],s_ref);
      // your_update_function(esult[result.length - 1]['id'], s_ref);

      console.log(this.clinic_settlement);
    }

  

   //Passing the table id to worksheet
  //  let table=document.getElementById('appointment-history');
  //  const worksheet = XLSX.utils.table_to_sheet(table);

   const worksheet = XLSX.utils.json_to_sheet(this.clinic_settlement)

  //  //Generate workbook and the worksheet
   const workbook:XLSX.WorkBook=XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook,worksheet,'clinic_settlements')

   //Saving the file
   XLSX.writeFile(workbook,'from'+'_'+strDate+'_'+'to'+'_'+enDate+'_'+'clinic_settlements.xlsx');
 }

 //Export PDF
 exportDoc(){
   
    //Converting starting and end dates
    let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

   autoTable(doc, { html: '#appointment-history' })
   doc.save('ClinicID'+'_'+this.clinics+'_'+'from'+'_'+strDate+'_'+'to'+'_'+enDate+'_'+'appointments.pdf');
 }

 //Filter table data
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
