import { Component,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import {PaymentService} from '../../../common/payment.service';
import {SpinnerService} from '../../../common/spinner.service';

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

  loading$ = this.spinner.loading$;

  constructor(private settlementService:PaymentService, private spinner:SpinnerService, private cdr:ChangeDetectorRef){
    this.cdr.detach();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }
  
  onUpload(ev:any) {
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
    this.settlementData.refernece="drc_123456";
    this.settlementData.clinic=0,
    this.settlementData.amount=12000,
    this.settlementData.date="2023-03-17",
    this.settlementService.saveCompletedSettlement(this.settlementData).subscribe({
      complete:()=>{this.spinner.hide()
      console.log('Successful!')
      },
      error:(e)=>{this.spinner.hide();
      console.log(e);
      }
    });
  }

 
}
