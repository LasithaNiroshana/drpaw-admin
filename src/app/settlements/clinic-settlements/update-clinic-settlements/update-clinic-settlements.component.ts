import { Component,AfterViewInit,ChangeDetectorRef,Inject } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import {PaymentService} from '../../../common/payment.service';
import {SpinnerService} from '../../../common/spinner.service';
import {NotPaidSettlementsComponent} from '../not-paid-settlements/not-paid-settlements.component';

export interface CompletedSettlements{
  refernece:string;
  clinic:number;
  amount:number;
  date:string;
}

@Component({
  selector: 'app-update-clinic-settlements',
  templateUrl: './update-clinic-settlements.component.html',
  styleUrls: ['./update-clinic-settlements.component.scss']
})
export class UpdateClinicSettlementsComponent implements AfterViewInit {
  file:any = [];
  settlementArray:any=[];
  settlementData:CompletedSettlements={
    refernece:"",
    clinic:0,
    amount:12000,
    date:"",
  }

  selectedSettlementList:any=[]

  loading$ = this.spinner.loading$;

  constructor(private settlementService:PaymentService, private spinner:SpinnerService, private cdr:ChangeDetectorRef,public dialogRef:MatDialogRef<NotPaidSettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private datePipe:DatePipe){
    this.cdr.detach();
    this.selectedSettlementList=data.settlementList;
    console.log(this.selectedSettlementList);
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }
  
  onUpdate() {
    // let jsonData = null;
    // const reader = new FileReader();
    // var uploadedFile = this.file; 
    // reader.readAsBinaryString(uploadedFile);

    // reader.onload=(event:any)=>{
    //   let binaryData=event.target.result;
    //   let workBook=XLSX.read(binaryData,{type:'binary'});

    //   jsonData = workBook.SheetNames.reduce((initial:any, name) => {
    //     const sheet = workBook.Sheets[name];
    //     initial = XLSX.utils.sheet_to_json(sheet);
    //     this.settlementArray=initial;

    //     //Update Paid status of appointments/settlements
    //     this.settlementArray.forEach((element:any) => {
    //       this.settlementService.updateSettlementStatus(element.paid_date,element.settlement_ref).subscribe({
    //         complete:()=>console.log('Successfully updated clinic settlements')
    //       });
    //     });
    //   }, {});
    // }
    this.spinner.show();

    let today = new Date();
    today.setDate(today.getDate());
    let todayDate:string = this.datePipe.transform(today, 'yyyy-MM-dd') as string;

    this.selectedSettlementList.forEach((settlement:any) => {

    this.settlementData.refernece=settlement.settlement_ref;
    this.settlementData.clinic=settlement.clinic;
    this.settlementData.amount=settlement.settlement;
    this.settlementData.date=todayDate;

    // console.log(settlement.settlement_ref);

    //Add to completed settlements list
    // this.settlementService.saveCompletedSettlement(this.settlementData).subscribe({
    //   complete:()=>{this.spinner.hide()
    //   console.log('Successful!')
    //   },
    //   error:(e)=>{this.spinner.hide();
    //   console.log(e);
    //   }
    // });

    //Update paid date and status
    this.settlementService.updateSettlementStatus(todayDate,settlement.settlement_ref).subscribe({
      complete:()=>{this.spinner.hide();
        console.log('Successful!');
        },
        error:(e)=>{this.spinner.hide();
        console.log(e);
        }
    });
    });
    
    this.spinner.hide();
  }

 
}
