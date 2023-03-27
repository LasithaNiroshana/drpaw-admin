import {Component, ViewChild,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import {PaymentService} from '../../../common/payment.service';
import {UpdateClinicSettlementsComponent} from '../update-clinic-settlements/update-clinic-settlements.component';
import {NotPaidSettlementsAppointmentsComponent} from './not-paid-settlements-appointments/not-paid-settlements-appointments.component';

export interface SettlementInfo{
  clinicID:number;
  clinicName:string;
  settlement:number;
  appointments:any;
}

@Component({
  selector: 'app-not-paid-settlements',
  templateUrl: './not-paid-settlements.component.html',
  styleUrls: ['./not-paid-settlements.component.scss']
})

export class NotPaidSettlementsComponent implements AfterViewInit {

  sortedAppointments:any=[];

  current_ref = 0;
  prev_ref = 0;
  clinic_name:string='';

  clinic_total = 0;
  clinic_settlement:any = [];
  appList:any=[]

  trans_pre = "drc";

  selectedSettlementList:any=[];
  btndisabled=true;

  displayedColumns: string[] = ['select','clinic','clinic_name','settlement_ref','settlement', 'details'];
  dataSource: MatTableDataSource<SettlementInfo> = new MatTableDataSource();
  selection = new SelectionModel<SettlementInfo>(true, []);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private settlementsService:PaymentService,private dialog:MatDialog,private datepipe:DatePipe,private snackbar:MatSnackBar){}

  ngAfterViewInit(){
    this.calculateNotPaidSettlements();
  }

//Calculate Settlements of all clinics
calculateNotPaidSettlements(){

  let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    let yesterdayDate:string = this.datepipe.transform(todayDate, 'yyyy-MM-dd') as string;

  this.settlementsService.getNotPaidSettlementAppointnments().subscribe({
    next:(res:any)=>{
      // console.log(res);
      this.sortedAppointments=res;
    // console.log(res);
    var result = this.sortedAppointments;
    var app_list=[];
    var c_name = "none";
    var clinic_id="";

  if(result.length > 0){
    this.current_ref = result[0]['settlement_ref'];
    this.prev_ref = result[0]['settlement_ref'];
    c_name = result[0]['clinic_name'];
    clinic_id=result[0]['clinic'];
    // console.log(c_name);
    // var uid = (Math.floor(Date.now() / 1000)).toString();
    // appointment referece code
    // var s_ref = "none";

    // console.log(result.length);

    for(var i = 0; result.length > i; i++){
      this.current_ref = result[i]['settlement_ref'];
     
      
      if(this.current_ref === this.prev_ref){
        if(result[i]['a_source']===0){
          this.clinic_total += result[i]['a_payment'];
          c_name = result[i]['clinic_name'];
          app_list.push(result[i]);
          }
          else{
            this.clinic_total -=result[i]['a_charge'];
            c_name = result[i]['clinic_name'];
            app_list.push(result[i]);
          }
  
      }else{
        this.clinic_settlement.push({
          "clinic" : clinic_id,
          "settlement" : this.clinic_total,
          "settlement_ref": this.prev_ref,
          "clinic_name": c_name,
          "apps": app_list
        });

        c_name="";
        app_list = [];
        // clinic_id = "none";
        this.clinic_total = 0;
        if(result[i]['a_source']===0){
          this.clinic_total += result[i]['a_payment'];
          c_name = result[i]['clinic_name'];
          app_list.push(result[i]);
          }
          else{
            this.clinic_total -=result[i]['a_charge'];
            c_name = result[i]['clinic_name'];
          app_list.push(result[i]);
          }
        // app_list.push(result[i]);
        c_name = result[i]['clinic_name'];
        // s_ref = result[i]['settlement_ref'];

      }

      this.prev_ref = this.current_ref;
    }
    this.clinic_settlement.push({
      "clinic" : clinic_id,
      "settlement" : this.clinic_total,
      "settlement_ref": this.prev_ref,
      "clinic_name": c_name,
      "apps": app_list
    });

    // console.log(this.clinic_settlement);
    this.dataSource = new MatTableDataSource(this.clinic_settlement);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    }

  });
  
    
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

  //Update completed settlements  
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAppointments(appointments:any){
    this.dialog.open(NotPaidSettlementsAppointmentsComponent,{
      data:{
        appointmentsList:appointments
      }
    });
  }

  //Open updating settlements confirmation dialog
  updatePaidSettlements(){
    if(this.selectedSettlementList==0){
      this.openSnackBar('Please select settlements to proceeed!','OK');
      this.btndisabled=true;
    }
    else{
      this.dialog.open(UpdateClinicSettlementsComponent,{
        data:{
          settlementList:this.selectedSettlementList
        }
      });
    }
  }

  //Open snackbar 
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}


}
