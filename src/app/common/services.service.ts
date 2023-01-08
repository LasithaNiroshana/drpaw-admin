import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient, public globalService: GlobalService) { }

  //HAndle network errors
  handleError(error: HttpErrorResponse) {
    let errorMessage = {"type":"unknown", "code":0, "message":"unknown"};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = {"type":"client", "code":0, "message":error.error.message};
    } else {
      // Server-side errors
      errorMessage = {"type":"server", "code":error.status, "message":error.message};
    }

    return throwError(errorMessage);
  }

  //Get all the service proviers list
  public GetProviders(){
    const url = this.globalService.apiURL + 'provider/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Add new service provider
  public SaveProvider(provider: any){
    const url = this.globalService.apiURL + 'provider/';
    
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, provider).pipe(catchError(this.handleError));
  }

  //Edit service provider
  public EditProvider(provider: any, id: any){
    const url = this.globalService.apiURL + 'provider/' + id + '/';
    
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, provider).pipe(catchError(this.handleError));
  }

  //Deactivate a service 
  public DeactivateService(provider: string){
    const url = this.globalService.apiURL + 'provider/';
    
    const params = new HttpParams().set('decid', provider);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Acticate a service
  public ActivateService(provider: string){
    const url = this.globalService.apiURL + 'provider/';
    
    const params = new HttpParams().set('acid', provider);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Add a new moderator to a specific service provider
  public AddUser(user: any){
    const url = this.globalService.apiURL + 'provider_board/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, user, {headers}).pipe(catchError(this.handleError));
  }

  //Edit a moderator of a specific service provider
  public EditUser(user: any, id: any){
    const url = this.globalService.apiURL + 'provider_board/' + id + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, user, {headers}).pipe(catchError(this.handleError));
  }

  //Get all moderators of a specific service provider
  public getUsers(provider: string){
    const url = this.globalService.apiURL + 'provider_board/';
    
    const params = new HttpParams().set('pid', provider);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Deactivate moderator of a specific service provider
  public DeactivateUser(user: any){
    const url = this.globalService.apiURL + 'provider_board/';

    const params = new HttpParams().set('decid', user);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Activate moderator of a service provider
  public ActivateUser(user: any){
    const url = this.globalService.apiURL + 'provider_board/';

    const params = new HttpParams().set('acid', user);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Get appointment list of a service provider
  public GetAppointments(provider: string){
    const url = this.globalService.apiURL + 'service_booking/';
    
    const params = new HttpParams().set('px', provider);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Approve service appointements
  public ApproveAppointment(appointment: string){
    const url = this.globalService.apiURL + 'service_booking/';
    
    const params = new HttpParams().set('appx', appointment);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Decline service appointments
  public DeclineAppointment(appointment: string){
    const url = this.globalService.apiURL + 'service_booking/';
    
    const params = new HttpParams().set('decx', appointment);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }
}
