import { Component,OnInit,Inject,AfterViewInit,ViewChild  } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {CompletedSettlementsComponent} from '../completed-settlements.component';
import {SettlementsService} from '../../../../common/settlements.service';

const doc = new jsPDF({
  orientation: "landscape",
  unit: "in",
  format: [8.3, 11.7]
});


//Interface for appointment details
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
  selector: 'app-completed-settlements-appointments',
  templateUrl: './completed-settlements-appointments.component.html',
  styleUrls: ['./completed-settlements-appointments.component.scss']
})
export class CompletedSettlementsAppointmentsComponent implements OnInit,AfterViewInit {
  s_ref:string;
  appointmentList:any=[];

  constructor(public dialogRef:MatDialogRef<CompletedSettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private settlementsService:SettlementsService){
    this.s_ref=data.referenceID;
  }

  displayedColumns: string[] = ['clinic_name','appointment_source','appointment_type','owner_name','mobile','owner_city','app_ref','a_payment','a_charge','a_date','a_time'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    this.getAppointments(this.s_ref);
  }

  getAppointments(reference:string){
    this.settlementsService.getCompletedSettlementsAppoinments(reference).subscribe({
      next:(appointments:any)=>{
        this.appointmentList=appointments;
        this.dataSource = new MatTableDataSource( this.appointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  exportExcel(){

    //Converting starting and end dates
    // let strDate:string = this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string;
    // let enDate:string = this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string;

   //Passing the table id to worksheet
   let table=document.getElementById('appointments-list');
   const worksheet = XLSX.utils.table_to_sheet(table);

  //  const worksheet = XLSX.utils.json_to_sheet(this.clinic_settlement)

  //  //Generate workbook and the worksheet
   const workbook:XLSX.WorkBook=XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook,worksheet,'completed_settlements_appointments')

   //Saving the file
   XLSX.writeFile(workbook,'completed_settlements_appointments.xlsx');
 }

 //Export PDF
 exportDoc(){

   autoTable(doc, { html: '#appointments-list' })
   doc.save('completed_settlements_appointments.pdf');
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
