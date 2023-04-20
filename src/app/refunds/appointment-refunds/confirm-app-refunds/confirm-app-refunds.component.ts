import { Component,Inject } from '@angular/core';
import {RefundsService} from '../../../common/refunds.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppointmentRefundsComponent} from '../appointment-refunds.component';

@Component({
  selector: 'app-confirm-app-refunds',
  templateUrl: './confirm-app-refunds.component.html',
  styleUrls: ['./confirm-app-refunds.component.scss']
})
export class ConfirmAppRefundsComponent {
  refundApps:any=[];

constructor(private refundsService:RefundsService, private dialog:MatDialog,public dialogRef:MatDialogRef<AppointmentRefundsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,){
  this.refundApps=data.refundAppointments;
}

// Send refund request
confirmRefundRequest(){
      this.refundApps.forEach((refundApp:any) => {
        // this.refundsService.requestRefunds(refundApp.transaction_id,refundApp.transaction_paid_amount).subscribe({
        //   complete:()=>{
        //     // console.log('Successfully sent refund request');
        //   },
        //   error:(e)=>{
        //     console.log(e);
        //   },
        //   next:(msg:any)=>{
        //     console.log(msg);
        //   }
        // });
        console.log(refundApp);
  }
  );
    
}


}
