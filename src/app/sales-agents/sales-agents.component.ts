import { Component,OnInit,AfterViewInit,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import {AddSalesAgentComponent} from './add-sales-agent/add-sales-agent.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SalesAgentsService} from '../common/sales-agents.service';
import {EditSalesAgentComponent} from './edit-sales-agent/edit-sales-agent.component';
import {SpinnerService} from '../common/spinner.service';

@Component({
  selector: 'app-sales-agents',
  templateUrl: './sales-agents.component.html',
  styleUrls: ['./sales-agents.component.scss']
})
export class SalesAgentsComponent implements OnInit,AfterViewInit,AfterContentChecked{

  salesAgentList:any=[];
  displayedColumns: string[] = ['salesID','name','address','mobile','email','edit'];

  loading$ = this.spinner.loading$;

constructor(private dialog:MatDialog, private sales:SalesAgentsService,private spinner:SpinnerService, private cdr:ChangeDetectorRef,private snackbar:MatSnackBar){
  this.cdr.detach();
}

ngAfterContentChecked() {
  this.cdr.detectChanges();
}

  ngAfterViewInit() {
    this.getSalesList();
  }

ngOnInit(){
  
}

//Get sales agent list
async getSalesList(){
  this.spinner.show();
  this.sales.getSalesAgentList().subscribe({
    complete:()=>this.spinner.hide(),
    next:(res:any)=>{
        this.salesAgentList=res;
        if(this.salesAgentList==0){
          this.openSnackBar('There are no sales agents to show!','OK');
        }
        else{
          //
        }
    },
    error:(e)=>{
      this.openSnackBar('Error getting sales agents! Please try again.','OK');
      this.spinner.hide();
    }
  });
}

//Add new sales agent
addSalesAgent(){
  this.dialog.open(AddSalesAgentComponent);
}

//Edit sales agent
editSalesAgent(salesAgent:any){
  this.dialog.open(EditSalesAgentComponent,{
    data:{
      sales:salesAgent
    }
  });
}

 //Open snackbar 
 openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

}
