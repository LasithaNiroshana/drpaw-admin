import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError,Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RefundsService {

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

  //Accept non-discount user refunds
  public getUserRefunds(){
    const url = this.globalService.apiURL + 'pet_appointment/?udecline=0';
    
    // const params = new HttpParams().set('lmid', mobile);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Accept refund of discount customers
  public requestUserDiscount(cus: any, mob: any, app: any, amount: any){
    const url = this.globalService.apiURL + 'pet_appointment/';
    
    const params = new HttpParams().set('udiscus', cus).set('refundmob', mob).set('refundapp', app).set('udisamt', amount);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

}
