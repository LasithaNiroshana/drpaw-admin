import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private httpClient: HttpClient, public globalService: GlobalService) { 

  }

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

  //Save Clinic
  public SaveClinic(clinic: any){
    const url = this.globalService.apiURL + 'clinic/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, clinic, {headers}).pipe(catchError(this.handleError));
  }

  //Edit clinic
  public EditClinic(clinic: any){
    const url = this.globalService.apiURL + 'clinic/' + clinic.id + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, clinic, {headers}).pipe(catchError(this.handleError));
  }

  //Deactivating clinc
  public DeactivateClinic(clinic: any){
    const url = this.globalService.apiURL + 'clinic/';

    const params = new HttpParams().set('did', clinic);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Activating clinic
  public ActivateClinic(clinic: any){
    const url = this.globalService.apiURL + 'clinic/';

    const params = new HttpParams().set('aid', clinic);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Get clinic list
  public GetClinics(){
    const url = this.globalService.apiURL + 'clinic/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Add user to a clinic
  public AddUser(doctor: any){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, doctor, {headers}).pipe(catchError(this.handleError));
  }

  //Edit user of a clinic
  public EditUser(doctor: any){
    const url = this.globalService.apiURL + 'doctor_board/' + doctor.id + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, doctor, {headers}).pipe(catchError(this.handleError));
  }

  //Edit user login credentials of a clinic 
  public EditUserLogin(user: any, login: any){
    const url = this.globalService.apiURL + 'change_password/' + user + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, login, {headers}).pipe(catchError(this.handleError));
  }

  //Set new user login for clinic
  public SetUserLogin(user: any, login: any){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const params = new HttpParams().set('uid', user).set('logid', login);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Deactivate user of a clinic
  public DeactivateUser(user: any){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const params = new HttpParams().set('decid', user);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Activate user of a clinic
  public ActivateUser(user: any){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const params = new HttpParams().set('acid', user);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Get user list of a clinic
  public getUsers(clinic: string){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const params = new HttpParams().set('adid', clinic);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }
}
