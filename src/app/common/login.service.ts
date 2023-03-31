import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, public globalService: GlobalService) { }

  //Handle network errors
  handleError(error: HttpErrorResponse) {
    let errorMessage = {"type":"unknown", "code":0, "message":"unknown"};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = {"type":"client", "code":0, "message":error.error.message};
    } else {
      // Server-side errors
      console.log("Server error - " + error.message)
      errorMessage = {"type":"server", "code":error.status, "message":error.message};
    }

    return throwError(errorMessage);
  }

  //Get otp
  public getOTP(mobile: string){
    const url = this.globalService.apiURL + 'customer/';
    
    const params = new HttpParams().set('lmid', mobile);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Get user info
  public getInfo(cid: string){
    const url = this.globalService.apiURL + 'get_mobile/';

    const params = new HttpParams().set('cid', cid);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  // change login
  public getCustomer(cn: string){
    const url = this.globalService.apiURL + 'get_code/';
    
    const params = new HttpParams().set('cn', cn);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  public changeLogin(id: string, login: any){
    const url = this.globalService.apiURL + 'change_password/' + id + '/';

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.put(url, login, {headers}).pipe(catchError(this.handleError));
  }

  //Get auth token
  public getToken(user: any){
    const url = this.globalService.apiURL + 'api-token-auth/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.httpClient.post(url, user, {headers}).pipe(catchError(this.handleError));
  }

  //User login
  public loginUser(userID:any){
    const url = this.globalService.apiURL + 'api-auth/login/';

    const params = new HttpParams().set('cid', userID);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.put(url, userID, {headers}).pipe(catchError(this.handleError));
  }
}
