import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import {SpinnerService} from '../common/spinner.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit{
  showSpinner=false;
  constructor(private spinnerService:SpinnerService, private cdRef:ChangeDetectorRef){
  }

  ngOnInit() {
    this.init();
  }

  init(){
    this.spinnerService.getSpinnerObserver().subscribe((status)=>{
      this.showSpinner=status==='start';
      this.cdRef.detectChanges();
    })
  }

}
