import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PaymentService} from '../../../common/payment.service';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {AppointmentTransactionsFilterFormComponent} from '../appointment-transactions-filter-form/appointment-transactions-filter-form.component';

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

const doc = new jsPDF({
  orientation: "landscape",
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
  appointmentStatus:number=0;

  displayedColumns: string[] = ['clinic_name','appointment_source','appointment_status','appointment_sub_type','owner_name','mobile','created_on','a_date','a_time','a_payment','a_charge','no_show_amount'];
  dataSource: MatTableDataSource<AppointmentInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialogRef:MatDialogRef<AppointmentTransactionsFilterFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private appointmentService:PaymentService,private datePipe:DatePipe){
    this.clinics=data.cid;
    this.appointmentStatus=data.appStatus;
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
    //Obtaining appointments
    this.appointmentService.getAppointmentList(strDate,enDate).subscribe({
      next:(res:any)=>{
        this.sortedAppointments=res;
      },
      complete:()=>{
        var apps=this.sortedAppointments;
        // console.log(apps);
        // Filter the appointments array based on clinic type, appointment source, and appointment sub-type and store the filtered appointments in a new array
        if(this.clinics === 0 && this.appointmentSource === 2 && this.appointmentType === 3){
        //   this.dataSource = new MatTableDataSource(apps);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        console.log('xvnf,vnf');
        }
        else{
        let filteredAppointments = apps.filter((appointment:any) => 
        (this.clinics === 0 || appointment.clinic === this.clinics) &&
        (this.appointmentSource === 2 || appointment.app_source === this.appointmentSource) &&
        (this.appointmentType === 3 || appointment.a_sub_type === this.appointmentType));   
        this.dataSource = new MatTableDataSource(filteredAppointments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      }
    }
    );
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
