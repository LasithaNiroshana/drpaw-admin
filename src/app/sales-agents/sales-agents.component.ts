import { Component,OnInit } from '@angular/core';
import {AddSalesAgentComponent} from './add-sales-agent/add-sales-agent.component';
import {MatDialog} from '@angular/material/dialog';
import {SalesAgentsService} from '../common/sales-agents.service';
import {EditSalesAgentComponent} from './edit-sales-agent/edit-sales-agent.component';

@Component({
  selector: 'app-sales-agents',
  templateUrl: './sales-agents.component.html',
  styleUrls: ['./sales-agents.component.scss']
})
export class SalesAgentsComponent implements OnInit{

  salesAgentList:any=[];
  displayedColumns: string[] = ['salesID','name','address','mobile','email','edit'];
constructor(private dialog:MatDialog, private sales:SalesAgentsService){}

ngOnInit(){
  this.getSalesList();
}

//Get sales agent list
async getSalesList(){
  this.sales.getSalesAgentList().subscribe((res:any)=>{
    res.forEach((element:any) => {
      this.salesAgentList.push(element);
    });
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
}
