import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {PaymentService} from '../../../common/payment.service';

@Component({
  selector: 'app-update-clinic-settlements',
  templateUrl: './update-clinic-settlements.component.html',
  styleUrls: ['./update-clinic-settlements.component.scss']
})
export class UpdateClinicSettlementsComponent {
  file:any = [];
  settlementArray:any=[];

  constructor(private settlementService:PaymentService){}

  onChange(event:any) {
    this.file = event.target.files[0];
  }
  
  onUpload(ev:any) {
    let jsonData = null;
    const reader = new FileReader();
    var uploadedFile = this.file; 
    reader.readAsBinaryString(uploadedFile);

    reader.onload=(event:any)=>{
      let binaryData=event.target.result;
      let workBook=XLSX.read(binaryData,{type:'binary'});

      jsonData = workBook.SheetNames.reduce((initial:any, name) => {
        const sheet = workBook.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        this.settlementArray=initial;

        //Update Paid status of appointments/settlements
        this.settlementArray.forEach((element:any) => {
          this.settlementService.updateSettlementStatus(element.paid_date,element.settlement_ref).subscribe((res:any)=>{
            console.log(res);
          });
        });
      }, {});
    }
  }

 
}
