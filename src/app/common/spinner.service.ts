import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  // private count=0;
  // private spinner$=new BehaviorSubject<string>('');

  // // public isLoading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  // getSpinnerObserver():Observable<string>{
  //   return this.spinner$.asObservable();
  // }

  // constructor() { }

  // requestStarted(){
  //   if(++this.count===1){
  //     this.spinner$.next('start');
  //   }
  // }

  // requestEnded(){
  //   if(this.count===0 || --this.count===0){
  //     this.spinner$.next('stop');
  //   }
  // }

  // resetSpinner(){
  //   this.count=0;
  //   this.spinner$.next('stop');
  // }
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() {}

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
