import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count=0;
  private spinner$=new BehaviorSubject<string>('');

  public isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor() { }

}
