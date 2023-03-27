import { Component,Inject,ViewChild,OnInit,AfterContentInit, AfterViewInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ClinicSettlementsComponent} from '../clinic-settlements.component';

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
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['clinic_name','appointment_source','appointment_type','owner_name','mobile','owner_city','a_payment','a_charge','a_date','a_time'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  allAppointments:any=[];

  constructor(private dialogRef:MatDialogRef<ClinicSettlementsComponent>,@Inject(MAT_DIALOG_DATA) private data:any,private datepipe:DatePipe){
    this.allAppointments=data.appointmentList;
    // console.log(this.allAppointments);
    
  }
  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.allAppointments);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
  }
  ngOnInit(){
  }


  //Export as excel
  exportExcel(){

    //Converting starting and end dates
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterdayDate:string = this.datepipe.transform(yesterday, 'yyyy-MM-dd') as string;

   //Passing the table id to worksheet
   let table=document.getElementById('appointments-list');
   const worksheet = XLSX.utils.table_to_sheet(table);

  //  const worksheet = XLSX.utils.json_to_sheet(this.clinic_settlement)

  //  //Generate workbook and the worksheet
   const workbook:XLSX.WorkBook=XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook,worksheet,'clinic_appointments')

   //Saving the file
   XLSX.writeFile(workbook,yesterdayDate + '_' + 'clinic_appointments.xlsx');
 }

 //Export PDF
 exportDoc(){
   //Converting starting and end dates
   let yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   let yesterdayDate:string = this.datepipe.transform(yesterday, 'yyyy-MM-dd') as string;
   autoTable(doc, { html: '#appointments-list' })
   doc.save(yesterdayDate +'_'+'selcted_appointments.pdf');
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
