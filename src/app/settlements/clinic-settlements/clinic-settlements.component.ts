import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
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

export interface ClinicInfo {
  position: number;
  id: string;
  name: string;
  address: string;
  mobile: string;
  email:string;
  website:string;
  city:string;
  logo:string;
  active:number;
  created_on:string;
  province:string;
  district:string;
  rate:string;
  sale:number;
}

@Component({
  selector: 'app-clinic-settlements',
  templateUrl: './clinic-settlements.component.html',
  styleUrls: ['./clinic-settlements.component.scss']
})

export class ClinicSettlementsComponent implements OnInit,AfterViewInit{

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
  selectedSettlementList:any=[];

  // displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];
  displayedColumns: string[] = ['select','id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<ClinicInfo> = new MatTableDataSource();
  selection = new SelectionModel<ClinicInfo>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private dialog:MatDialog,private clinicService:ClinicService, private paymentService:PaymentService,private datepipe:DatePipe){
    const currentYear = new Date().getFullYear();
    //Setting up minimum and maximum dates for calendars
      this.minDate1 = new Date(currentYear - 1, 0, 1);
      this.maxDate1 = new Date(currentYear - 0, 0, 19);
      this.minDate2 = new Date(currentYear - 1, 0, 1);
      this.maxDate2 = new Date(currentYear - 0, 0, 0);
   
    // Assign the data to the data source for the table to render
  
  }
  ngAfterViewInit(): void {
    this.clinicService.GetClinics().subscribe((res:any)=>{
      this.clinics=res;
      this.dataSource = new MatTableDataSource(this.clinics);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  ngOnInit() {
    // this.getClinicList();
    
  }

   //Get appointment history of a clinic
   getAppointmentHistory(stdt:any,endt:any){
    this.dialog.open(ClinicSettlementsInfoComponent,{
      data:{
        // cid:clinicid,
        // appSource:appointmentSource,
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle($event:any) {
    if ($event.checked) {
      this.onCompleteRow(this.dataSource);
    }
    this.isAllSelected() ?
      this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
   selectRow($event:any, dataSource:any) {
    // console.log($event.checked);
    if ($event.checked) {
      // console.log(dataSource.name);
      this.selectedSettlementList.push(dataSource);
      console.log(this.selectedSettlementList);
    }
  }
  
  onCompleteRow(dataSource:any) {
    dataSource.data.forEach((element:any) => {
      this.selectedSettlementList.push(element);
      console.log(this.selectedSettlementList);
    });
  }
    
}
