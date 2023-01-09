import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private httpClient: HttpClient, public globalService: GlobalService) { }

  //Handling network errors
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

  //Get store list
  public GetStores(){
    const url = this.globalService.apiURL + 'store/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  }

  //Add a new store
  public SaveStore(store: any){
    const url = this.globalService.apiURL + 'store/';
    
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, store).pipe(catchError(this.handleError));
  }

  //Edit store
  public EditStore(store: any, id: any){
    const url = this.globalService.apiURL + 'store/' + id + '/';
    
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, store).pipe(catchError(this.handleError));
  }

  //Deactivate a store
  public DeactivateStore(store: any){
    const url = this.globalService.apiURL + 'store/';

    const params = new HttpParams().set('decid', store);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Activate a store
  public ActivateStore(store: any){
    const url = this.globalService.apiURL + 'store/';

    const params = new HttpParams().set('acid', store);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Add new store moderator
  public AddUser(user: any){
    const url = this.globalService.apiURL + 'store_board/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.post(url, user, {headers}).pipe(catchError(this.handleError));
  }

  //Edit user moderator
  public EditUser(user: any, user_id: any){
    const url = this.globalService.apiURL + 'store_board/' + user_id + '/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.put(url, user, {headers}).pipe(catchError(this.handleError));
  }

  //Deactivate store moderator
  public DeactivateUser(user: any){
    const url = this.globalService.apiURL + 'store_board/';

    const params = new HttpParams().set('decid', user);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Activate store moderator
  public ActivateUser(user: any){
    const url = this.globalService.apiURL + 'store_board/';

    const params = new HttpParams().set('acid', user);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

  //Get store moderator list of a specific store
  public getUsers(store: string){
    const url = this.globalService.apiURL + 'store_board/';
    
    const params = new HttpParams().set('sid', store);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError));
  }

}
