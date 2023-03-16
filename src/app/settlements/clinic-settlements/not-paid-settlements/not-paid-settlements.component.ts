import {Component, ViewChild,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {PaymentService} from '../../../common/payment.service';
import {ClinicSettlementsInfoComponent} from '../clinic-settlements-info/clinic-settlements-info.component';
import {UpdateClinicSettlementsComponent} from '../update-clinic-settlements/update-clinic-settlements.component';

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

  current_clinic = 0;
  prev_clinic = 0;
  clinic_name:string='';

  clinic_total = 0;
  clinic_settlement:any = [];
  appList:any=[]

  trans_pre = "drc";


  displayedColumns: string[] = ['clinic','clinic_name','settlement', 'details'];
  dataSource: MatTableDataSource<SettlementInfo> = new MatTableDataSource();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private settlementsService:PaymentService,private dialog:MatDialog,private datepipe:DatePipe){}

  ngAfterViewInit(){
    this.calculateNotPaidSettlements();
  }

//Calculate Settlements of all clinics
calculateNotPaidSettlements(){

  let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    let yesterdayDate:string = this.datepipe.transform(todayDate, 'yyyy-MM-dd') as string;

  this.settlementsService.getUnPaidSettlementAppointnments().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAppointments(appointments:any){
    this.dialog.open(ClinicSettlementsInfoComponent,{
      data:{
        appointmentsList:appointments
      }
    });
  }

  //
  uploadPaidSettlements(){
    this.dialog.open(UpdateClinicSettlementsComponent);
  }

}
