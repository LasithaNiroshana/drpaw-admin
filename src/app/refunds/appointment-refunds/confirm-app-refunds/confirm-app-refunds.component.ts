import { Component } from '@angular/core';
import {RefundsService} from '../../../common/refunds.service';

@Component({
  selector: 'app-confirm-app-refunds',
  templateUrl: './confirm-app-refunds.component.html',
  styleUrls: ['./confirm-app-refunds.component.scss']
})
export class ConfirmAppRefundsComponent {
  refundApps:any=[];

constructor(private refundsService:RefundsService){}

// Send refund request
confirmRefundRequest(){
  this.refundsService.getUserRefunds().subscribe({
    next:(res:any)=>{
      this.refundApps=res;
      this.refundApps.forEach((refundApp:any) => {
        this.refundsService.requestRefunds(refundApp.transaction_id,refundApp.transaction_paid_amount).subscribe({
          complete:()=>{
            console.log('Successfully sent refund request');
          },
          error:(e)=>{
            console.log(e);
          },
          next:(msg:any)=>{
            console.log(msg);
          }
        });
      });
    }
  }
  );
    
}


}
