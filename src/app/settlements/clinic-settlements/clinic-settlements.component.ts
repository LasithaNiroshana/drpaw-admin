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

  sortedAppointments:any=[];

  current_clinic = 0;
  prev_clinic = 0;
  clinic_name:string='';

  clinic_total = 0;
  clinic_settlement:any = [];

  trans_pre = "drc";

  // displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];
  displayedColumns: string[] = ['select','clinic','clinic_name','settlement', 'details'];
  dataSource: MatTableDataSource<ClinicInfo> = new MatTableDataSource();
  selection = new SelectionModel<ClinicInfo>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog,private clinicService:ClinicService, private settlementsService:PaymentService,private datepipe:DatePipe){
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
     
    });
    this.calculateSettlements();
  }

  ngOnInit() {
    // this.getClinicList();
    
  }

   //Get appointment history of a clinic
   calculateSettlements(){
    let strDate = '2022-01-01';
    let enDate = '2023-03-02';
    this.settlementsService.getAppointmentListfromDates(strDate,enDate).subscribe((res:any)=>{
      this.sortedAppointments=res;
      
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
          // this.settlementsService.generateSettlementReferenceId(result[i]['id'],s_ref).subscribe((res:any)=>{
          //   console.log(res);
          // });
          // your_update_function(esult[i]['id'], s_ref);
        }else{
          this.clinic_settlement.push({
            "clinic" : this.prev_clinic,
            "settlement" : this.clinic_total,
            "settlement_ref": s_ref,
          });

          this.clinic_total = 0;
          this.clinic_total += result[i]['a_payment'];

          // update appointment refernceid
          // this.settlementsService.generateSettlementReferenceId(result[i]['id'],s_ref).subscribe((res:any)=>{
          //   console.log(res);
          // });
          // your_update_function(esult[i]['id'], s_ref);
        }

        this.prev_clinic = this.current_clinic;
      }

      this.clinic_settlement.push({
        "clinic" : this.prev_clinic,
        "settlement" : this.clinic_total,
        "settlement_ref": s_ref,
      });

      // update appointment refernceid
      // this.settlementsService.generateSettlementReferenceId(result[result.length - 1]['id'],s_ref).subscribe((res:any)=>{
      //   console.log(res);
      // });
      // your_update_function(esult[result.length - 1]['id'], s_ref);

      console.log(this.clinic_settlement);
      this.dataSource = new MatTableDataSource(this.clinic_settlement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedSettlementList=[];
      console.log(this.selectedSettlementList);
      return;
    }
    else{
      this.selectedSettlementList=this.dataSource.data;
      console.log(this.selectedSettlementList);
      this.selection.select(...this.dataSource.data);
    }
  }

  updateList(element:any){
    if(this.selection.isSelected(element)){
      this.selectedSettlementList.push(element);
      console.log(this.selectedSettlementList);
    }
    else{
      this.selectedSettlementList.forEach((item:any,index:number) => {
        if(item===element) {
           this.selectedSettlementList.splice(index,1);
        console.log(this.selectedSettlementList);
        }
      });
    }
  }
    
}
