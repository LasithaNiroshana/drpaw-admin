import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SalesAgentsService {

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
   public getSalesAgentList(){
    const url = this.globalService.apiURL + 'sales_person/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Add new sales agent
  public addSalesAgent(salesAgent: any){
    const url = this.globalService.apiURL + 'sales_person/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, salesAgent, {headers}).pipe(catchError(this.handleError));
  }

  //Edit sales agent
  public editSalesAgent(salesAgent: any,salesAgentID:number){
    const url = this.globalService.apiURL + 'sales_person/' + salesAgentID + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, salesAgent, {headers}).pipe(catchError(this.handleError));
  }

}
