import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  public token: string = "";

  public store: string = "1";
  public provider: string = "1";

  constructor() { }
}
