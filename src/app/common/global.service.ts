import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Global url will be managed through this service
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  // public apiURL: string ="http://127.0.0.1:8000/";
  public token: string = "";

  public store: string = "1";
  public provider: string = "1";

  constructor() { }
}
