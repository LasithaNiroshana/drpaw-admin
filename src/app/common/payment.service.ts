import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError,Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient, public globalService: GlobalService) { }

   //Handling http error
   handleError(error: HttpErrorResponse) {
    let errorMessage = {"type":"unknown", "code":0, "message":"unknown"};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = {"type":"client", "code":0, "message":error.error.message};
    } else {
      // Server-side errors
      errorMessage = {"type":"server", "code":error.status, "message":error.message};
    }

    return throwError(() => error);
  }

  //Get appointment history of all the clinics
  public getAppointmentList(){
    const url = this.globalService.apiURL + 'pet_appointment/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

   //Get appointment history of all the clinics
   public getAppointmentListfromDates(startDate:string,endDate:string){
    const url = this.globalService.apiURL + 'pet_appointment/?cid=0'+ '&stdt=' + startDate + '&endt=' + endDate;
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Get completed appointments
  public getCompletedAppoitnments(endDate:string){
    const url = this.globalService.apiURL + 'pet_appointment/?endt=' + endDate + '&cid=0';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Get payment history of a clinic
  public getPaymentsClinic(cid:string,stdt:string,endt:string){
    const url = this.globalService.apiURL + 'pet_appointment/' + '?cid=' + cid + '&stdt=' + stdt + '&endt=' + endt;
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Generate settlement reference id for appointment 
  public generateSettlementReferenceId(appointmentid:string,apprefcode:string){
    const url = this.globalService.apiURL + 'pet_appointment/?appref='+ appointmentid + '&apprefcode=' + apprefcode;

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Get not paid settlement appointments
  public getUnPaidSettlementAppointnments(){
    const url = this.globalService.apiURL + 'pet_appointment/?pcid=0';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Update paid status of appointments/settlements
  public updateSettlementStatus(datepaid:string,apprefcode:string){
    const url = this.globalService.apiURL + 'pet_appointment/?refpdate='+ datepaid + '&updref=' + apprefcode;

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Save completed settlements set
  public saveCompletedSettlement(clinicSettlement:any){
    const url = this.globalService.apiURL + 'clinic_complete_settlement/';
    
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, clinicSettlement, {}).pipe(catchError(this.handleError));
  }
}
