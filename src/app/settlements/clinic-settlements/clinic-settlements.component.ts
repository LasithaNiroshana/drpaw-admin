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
import {ConfirmAddingSettlementrefComponent} from '../clinic-settlements/confirm-adding-settlementref/confirm-adding-settlementref.component';
import {SpinnerService} from '../../common/spinner.service';

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

export interface SettlementInfo{
  clinicID:number;
  clinicName:string;
  settlement:number;
  appointments:any;
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

  appList:any=[]

  trans_pre = "drc";
  btndisabled=true;

  loading$ = this.spinner.loading$;

  // displayedColumns: string[] = ['clinic_name','appointment_type','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];
  displayedColumns: string[] = ['select','clinic','clinic_name','settlement', 'details'];
  dataSource: MatTableDataSource<SettlementInfo> = new MatTableDataSource();
  selection = new SelectionModel<SettlementInfo>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog,private clinicService:ClinicService, private settlementsService:PaymentService,private datepipe:DatePipe, private spinner:SpinnerService){
    const currentYear = new Date().getFullYear();
    //Setting up minimum and maximum dates for calendars
      this.minDate1 = new Date(currentYear - 1, 0, 1);
      this.maxDate1 = new Date(currentYear - 0, 0, 19);
      this.minDate2 = new Date(currentYear - 1, 0, 1);
      this.maxDate2 = new Date(currentYear - 0, 0, 0);
   
    // Assign the data to the data source for the table to render
  
  }
  ngAfterViewInit(): void {
    // this.clinicService.GetClinics().subscribe((res:any)=>{
    //   this.clinics=res;
     
    // });
    // this.calculateSettlements();
    // this.settlementsService.getCompletedAppoitnments('2023-03-14').subscribe({
    //   next:(res:any)=>{
    //     console.log(res);
    //   }
    // })
    this.calculateSettlements();
  }

  ngOnInit() {
    // this.getClinicList();
    
  }

   //Calculate Settlements of all clinics
   calculateSettlements(){
    // let strDate = '2022-01-01';
    // let enDate = '2023-03-02';
    
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    let yesterdayDate:string = this.datepipe.transform(todayDate, 'yyyy-MM-dd') as string;
    this.spinner.show();
    this.settlementsService.getCompletedAppoitnments(yesterdayDate).subscribe({
      complete:()=>this.spinner.hide(),
      error:(e)=>{this.spinner.hide()},
      next:(res:any)=>{
        // console.log(res);
        this.sortedAppointments=res;
      
      var result = this.sortedAppointments;
      var app_list=[];
      var c_name = "none";
    if(result.length > 0){
      this.current_clinic = result[0]['clinic'];
      this.prev_clinic = result[0]['clinic'];
      c_name = result[0]['clinic_name'];
      // console.log(c_name);
      var uid = (Math.floor(Date.now() / 1000)).toString();
      // appointment referece code
      var s_ref = "none";

      // console.log(result.length);

      for(var i = 0; result.length > i; i++){
        this.current_clinic = result[i]['clinic'];
        s_ref = this.trans_pre + "_" + this.prev_clinic.toString() + "_" + uid;
        
        if(this.current_clinic === this.prev_clinic){
          this.clinic_total += result[i]['a_payment'];
          c_name = result[i]['clinic_name'];
          app_list.push(result[i]);
          // console.log(app);
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
            "clinic_name": c_name,
            "apps": app_list
          });

          c_name="";
          app_list = [];
          s_ref = "none";
          this.clinic_total = 0;
          this.clinic_total += result[i]['a_payment'];
          app_list.push(result[i]);
          c_name = result[i]['clinic_name'];

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
        "clinic_name": c_name,
        "apps": app_list
      });

      // update appointment refernceid
      // this.settlementsService.generateSettlementReferenceId(result[result.length - 1]['id'],s_ref).subscribe((res:any)=>{
      //   console.log(res);
      // });
      // your_update_function(esult[result.length - 1]['id'], s_ref);

      // console.log(this.clinic_settlement);
      // console.log(this.clinic_settlement);
      this.dataSource = new MatTableDataSource(this.clinic_settlement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
      }
      
    });
    }

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
      // console.log(this.selectedSettlementList);
      this.btndisabled=true;
      return;
    }
    else{
      this.selectedSettlementList=this.dataSource.data;
      // console.log(this.selectedSettlementList);
      this.selection.select(...this.dataSource.data);
      this.btndisabled=false;
    }
  }

  updateList(element:any){
    if(this.selection.isSelected(element)){
      this.selectedSettlementList.push(element);
      // console.log(this.selectedSettlementList);
      this.btndisabled=false;
    }
    else{
      this.selectedSettlementList.forEach((item:any,index:number) => {
        if(item===element) {
           this.selectedSettlementList.splice(index,1);
        // console.log(this.selectedSettlementList);
        this.btndisabled=false;
        }
      });
    }
  }

  openAppointments(appointments:any){
    this.dialog.open(ClinicSettlementsInfoComponent,{
      data:{
        appointmentsList:appointments
      }
    });
  }

  generateSheet(){
    console.log();
    this.dialog.open(ConfirmAddingSettlementrefComponent,{
      data:{
        settlementList:this.selectedSettlementList
      }
    });
  }
    
}
