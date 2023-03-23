import { Component,Inject,OnInit,AfterViewInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClinicSettlementsComponent} from '../clinic-settlements.component';
import {PaymentService} from '../../../common/payment.service';
import * as XLSX from 'xlsx';
import {SpinnerService} from '../../../common/spinner.service';

@Component({
  selector: 'app-confirm-adding-settlementref',
  templateUrl: './confirm-adding-settlementref.component.html',
  styleUrls: ['./confirm-adding-settlementref.component.scss']
})
export class ConfirmAddingSettlementrefComponent implements OnInit,AfterViewInit {

  settlementList:any=[];

  current_clinic = 0;
  prev_clinic = 0;
  clinic_name:string='';
  trans_pre = "drc";

  settlementData:any=[];

  loading$ = this.spinner.loading$;

  constructor(private dialog:MatDialog,public dialogRef:MatDialogRef<ClinicSettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private settlementService:PaymentService, private datePipe:DatePipe, private spinner:SpinnerService,private snackbar:MatSnackBar){
    this.settlementList=data.settlementList;
   
  }


  ngAfterViewInit(){
    
  }


  ngOnInit() {
   
  }

  generateSettlementSheet(){
    this.spinner.show();
    var result=this.settlementList;
    var ref="this is ref";
    var uid = (Math.floor(Date.now() / 1000)).toString();
   
    let settlement_ref = "";
    result.forEach((item:any) => {
      var uid = (Math.floor(Date.now() / 1000)).toString();
      var s_ref = this.trans_pre + "_" + item.clinic + "_" + uid;
      item.apps.forEach((app:any) => {
        // do something with each app object
   
    console.log(s_ref);
    // console.log(`${app.id}`);
    // console.log(s_ref);
    this.settlementService.generateSettlementReferenceId(app.id,s_ref).subscribe({
      complete:()=>{
        this.openSnackBar('Selected settlements sent to settle successfully','OK')
        this.spinner.hide();
      },
      error:(e)=>{
        console.log(e);
        this.spinner.hide();
      }
    });
      });
      item.settlement_ref = s_ref;
      delete item.apps;
    });
    
    console.log(result);
    this.spinner.hide();

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
let yesterdayDate:string = this.datePipe.transform(yesterday, 'yyyy-MM-dd') as string;

//Passing the table id to worksheet
//  let table=document.getElementById('appointment-history');
//  const worksheet = XLSX.utils.table_to_sheet(table);

const worksheet = XLSX.utils.json_to_sheet(result);

//  //Generate workbook and the worksheet
const workbook:XLSX.WorkBook=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook,worksheet,'clinic_settlements');

this.spinner.hide();
//Saving the file
XLSX.writeFile(workbook,yesterdayDate + '_'+'clinic_settlements.xlsx');

}

//Open snackbar 
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

  }

