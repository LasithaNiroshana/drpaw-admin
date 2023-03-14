import { Component,Inject,OnInit,AfterViewInit } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClinicSettlementsComponent} from '../clinic-settlements.component';

@Component({
  selector: 'app-confirm-adding-settlementref',
  templateUrl: './confirm-adding-settlementref.component.html',
  styleUrls: ['./confirm-adding-settlementref.component.scss']
})
export class ConfirmAddingSettlementrefComponent implements OnInit,AfterViewInit {

  settlementList:any=[];

  constructor(private dialog:MatDialog,public dialogRef:MatDialogRef<ClinicSettlementsComponent>,@Inject(MAT_DIALOG_DATA) public data:any,){
    this.settlementList=data.settlementList;
    console.log(this.settlementList);
  }


  ngAfterViewInit(){
    
  }


  ngOnInit() {
   
  }


}
