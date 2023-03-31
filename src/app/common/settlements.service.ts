import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  throwError,Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

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

  //Get completed settlements
  public getCompletedSettlements(){
    const url = this.globalService.apiURL + 'clinic_complete_settlement/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Get Appointments of completed settlements
  public getCompletedSettlementsAppoinments(settlement_ref:string){
    const url = this.globalService.apiURL + 'pet_appointment/?fref=' + settlement_ref;
    
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }
}
