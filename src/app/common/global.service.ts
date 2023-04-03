import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

//Global url will be managed through this service
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  public token=localStorage.getItem('token');
  // public token: string = "c150a672fb334ceba70843313851d724e1002789";

  public store: string = "1";
  public provider: string = "1";

  constructor() { }

 
}
