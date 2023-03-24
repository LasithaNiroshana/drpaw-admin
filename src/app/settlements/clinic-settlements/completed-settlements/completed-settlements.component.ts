import { Component,OnInit,AfterViewInit,ViewChild,ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SettlementsService} from '../../../common/settlements.service';
import {CompletedSettlementsAppointmentsComponent} from './completed-settlements-appointments/completed-settlements-appointments.component';

export interface SettlementInfo{
  refernece:number;
  clinic:string;
  amount:number;
  date:any;
}

@Component({
  selector: 'app-completed-settlements',
  templateUrl: './completed-settlements.component.html',
  styleUrls: ['./completed-settlements.component.scss']
})
export class CompletedSettlementsComponent implements OnInit,AfterViewInit,AfterContentChecked{

  completedSettlements:any=[];

  displayedColumns: string[] = ['reference','clinic','settlement', 'details'];
  dataSource: MatTableDataSource<SettlementInfo> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private settlementsService:SettlementsService, private dialog:MatDialog){}

  ngAfterViewInit(){

    this.getCompletedSettlements();
  }
  ngAfterContentChecked() {
   
  }
  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCompletedSettlements(){
    this.settlementsService.getCompletedSettlements().subscribe({
      complete:()=>{},
      next:(settlements:any)=>{
        this.completedSettlements=settlements;
        console.log(this.completedSettlements);
        this.dataSource = new MatTableDataSource(this.completedSettlements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openAppointmentList(reference:number){
    console.log(reference);
    this.dialog.open(CompletedSettlementsAppointmentsComponent,{
      data:{
        referenceID:reference
      }
    });
  }
}
