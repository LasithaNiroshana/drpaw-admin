import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SalesAgentsService} from '../../common/sales-agents.service';
import {MatDialog} from '@angular/material/dialog';

export interface salesAgents{
  name: string;
  address:string;
  mobile:string;
  email:string;
  active:number;
}

@Component({
  selector: 'app-add-sales-agent',
  templateUrl: './add-sales-agent.component.html',
  styleUrls: ['./add-sales-agent.component.scss']
})
export class AddSalesAgentComponent {

  constructor(private snackbar:MatSnackBar,private sales:SalesAgentsService,private dialog:MatDialog){
  }
  
salesAgent:salesAgents={
  name: "",
  address:"",
  mobile:"",
  email:"",
  active:0
}

 //Open snackbar 
 openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

// onSubmit(formValues:JSON){

//   if(this.salesAgent.name!=""
//   &&  
//   this.salesAgent.address!=""
//   && 
//   this.salesAgent.email!="" 
//   && 
//   this.salesAgent.active!=null 
//   ){
//     this.sales.addSalesAgent(formValues).subscribe((result: any)=>{
//       console.log(result);
//     });
//     console.log(formValues);
//     this.dialog.closeAll();
//     this.openSnackBar('Sales agent details successfully','OK');
//   }
//   else{
//     this.openSnackBar('One or more fields missing!','OK');
//   }
// }

//Submitting form
onSubmit(){
   if(this.salesAgent.name!=""
  &&  
  this.salesAgent.address!=""
  && 
  this.salesAgent.email!="" 
  && 
  this.salesAgent.active!=null 
  ){
    this.sales.addSalesAgent(this.salesAgent).subscribe({
      complete: () => this.openSnackBar('Successfully added new sales agent.','OK'),
      error: (e) => this.openSnackBar('Error occured while adding new sales agent!'+ e,'OK'),
    });
    this.dialog.closeAll();
  }
  else{
    this.openSnackBar('One or more fields missing!','OK');
  }
}

}
