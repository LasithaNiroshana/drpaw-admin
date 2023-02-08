import { Component,OnInit } from '@angular/core';
import {PaymentService} from '../../common/payment.service';

@Component({
  selector: 'app-appointment-refunds',
  templateUrl: './appointment-refunds.component.html',
  styleUrls: ['./appointment-refunds.component.scss']
})
export class AppointmentRefundsComponent implements OnInit{
  pendingRefunds:any=[]
  displayedColumns: string[] = ['clinic_name','appointment_subtype','animal_type','owner_name','mobile','owner_city','s_date','s_time','a_date','a_time','a_payment','a_charge'];
  constructor(private appointmentService:PaymentService){}


  ngOnInit() {
    this.viewRefunds();
  }

  viewRefunds(){
    //Get appointment history of all clinics
    this.appointmentService.getAppointmentList().subscribe((res:any)=>{
      res.forEach((element:any)=>{
        if(element.active==2 && element.active==3){
          this.pendingRefunds.push(element)
        }
      });
      console.log(this.pendingRefunds);
     });
  }

}
