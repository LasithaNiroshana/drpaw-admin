import { Component,Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SalesAgentsComponent} from '../sales-agents.component';
import {SalesAgentsService} from '../../common/sales-agents.service';

export interface salesAgents{
  id:number;
  name: string;
  address:string;
  mobile:string;
  email:string;
  active:number;
}


@Component({
  selector: 'app-edit-sales-agent',
  templateUrl: './edit-sales-agent.component.html',
  styleUrls: ['./edit-sales-agent.component.scss']
})
export class EditSalesAgentComponent {

  salesAgent:any=[]

  constructor(private dialog:MatDialog,public dialogRef:MatDialogRef<SalesAgentsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private salesService:SalesAgentsService,private snackbar:MatSnackBar){
    this.salesAgent=data.sales;
    console.log(this.salesAgent);
  }

  sales:salesAgents={
    id:this.salesAgent.id,
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

onSubmit(formValues:JSON){

  if(this.salesAgent.name!=""
  &&  
  this.salesAgent.address!=""
  && 
  this.salesAgent.email!="" 
  && 
  this.salesAgent.active!=null 
  ){
    this.salesService.editSalesAgent(formValues,this.salesAgent.id).subscribe((result: any)=>{
      console.log(result);
    });
    this.dialog.closeAll();
    this.openSnackBar('Successfully edited sales agent.','OK');
  }
  else{
    this.openSnackBar('One or more fields missing!','OK');
  }
}
  
}
