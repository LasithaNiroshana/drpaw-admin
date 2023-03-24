import { Component } from '@angular/core';
import {RefundsService} from '../../../common/refunds.service';

@Component({
  selector: 'app-confirm-app-refunds',
  templateUrl: './confirm-app-refunds.component.html',
  styleUrls: ['./confirm-app-refunds.component.scss']
})
export class ConfirmAppRefundsComponent {

constructor(private refundsService:RefundsService){}

// Send refund request
confirmRefundRequest(){
  this.refundsService.getUserRefunds().subscribe((res:any)=>{
    if(res.length > 0){
      for(var i = 0; res.length > i; i++){
        var customer = res[i]['owner'];
        var customer_mobile = res[i]['mobile'];
        var pet_app = res[i]['id'];
        var transaction = res[i]['transaction_id'];

        var doctor_payment = res[i]['a_payment'];
        var drpaw_payment = res[i]['a_charge'];
        var no_show_payment = res[i]['no_show_amount'];
        var dis_payment = res[i]['d_amount'];

        var total_amount = doctor_payment + drpaw_payment + no_show_payment;

        if(total_amount === dis_payment){
          // discounted payment
          // console.log("discounted refund");

          // update discount
          var discount_return = dis_payment - (drpaw_payment + no_show_payment);
          // console.log(discount_return);
          this.requestDiscountedRefund(customer, customer_mobile, pet_app, discount_return);
        }else{
          // partial or full payment

          // console.log("partial discount refund");

          var not_refundable_amount = drpaw_payment + no_show_payment;
        }
        
      }
    }  
  }
  );
    
}

//Request refunds for discount appointments
requestDiscountedRefund(cus: any, mob: any, app: any, amount: any){
  this.refundsService.requestUserDiscount(cus, mob, app, amount).subscribe({
    complete:()=>{
      console.log('Successfully sent refund request');
    },
    error:(e)=>{
      console.log(e);
    }
  });
}

}
