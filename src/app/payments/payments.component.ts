import { Component,ViewChild, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsInfoComponent } from '../payments/payments-info/payments-info.component';
import {PaymentService} from '../common/payment.service';

interface Clinic {
  value: string;
  viewValue: string;
}

//Interface for payment details
export interface PaymentDetails {
  clinicName: string;
  noOfAppointments:number;
  total: number;
  incomes:number;
  doctorsValue:number;
}

//Importing payment data
const PAYMENT_DATA: PaymentDetails[] = [
  {clinicName: 'Clinic 1', noOfAppointments:10, total: 12500, doctorsValue: 10000, incomes: 2500},
  {clinicName: 'Clinic 2', noOfAppointments:24, total: 30000, doctorsValue: 24000, incomes: 6000},
  {clinicName: 'Clinic 3', noOfAppointments:12, total: 15000, doctorsValue: 12000, incomes: 3000},
  {clinicName: 'Clinic 4', noOfAppointments:18, total: 22500, doctorsValue: 18000, incomes: 4500},
  {clinicName: 'Clinic 5', noOfAppointments:14, total: 17500, doctorsValue: 14000, incomes: 3500},
];
const doc = new jsPDF({
  orientation: "portrait",
  unit: "in",
  format: [8.3, 11.7]
});


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit{

  paymentList:any=[];

  // Available veterinary clinics 
  clinics: Clinic[] = [
    {value: 'DrPaw', viewValue: 'DrPaw'},
    {value: 'Clinic 1', viewValue: 'Clinic 1'},
    {value: 'Clinic 2', viewValue: 'Clinic 2'},
  ];

  displayedColumns: string[] = ['clinicName','noOfAppointments','total','doctorsValue','incomes','moreDetails'];
  dataSource = PAYMENT_DATA;

  dSource=new MatTableDataSource(PAYMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)!
  sort!: MatSort;
  

  constructor(private _httpClient: HttpClient,private dialog:MatDialog,private paymentsService:PaymentService) {}

  ngOnInit(){
    // this.paymentsService.getPaymentsList().subscribe(res=>{
    //   console.log(res);
    // });
  }

  //Make download pdf
  makepdf(){
    autoTable(doc, { html: '#content' })
    doc.save('payment.pdf');
    }

    //Open more payment information about clinic
    moreInfo(){
      this.dialog.open(PaymentsInfoComponent);
    }
  
}