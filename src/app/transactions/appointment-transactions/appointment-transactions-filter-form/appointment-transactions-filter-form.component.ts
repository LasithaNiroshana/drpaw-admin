import { Component,OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PaymentService} from '../../../common/payment.service';
import {ClinicService} from '../../../common/clinic.service';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentInfoComponent} from '../appointment-info/appointment-info.component';

@Component({
  selector: 'app-appointment-transactions-filter-form',
  templateUrl: './appointment-transactions-filter-form.component.html',
  styleUrls: ['./appointment-transactions-filter-form.component.scss']
})
export class AppointmentTransactionsFilterFormComponent implements OnInit {
  clinics:any=[];
  appointmentHistory:any=[];
  clinicID:any;  //ClinicID
  startDate=new Date(); //Starting date
  endDate=new Date();  //Ending date
  minDate1: Date; //minDate
  maxDate1: Date; //maxDate
  minDate2: Date; //minDate
  maxDate2: Date; //maxDate
  appointmentType:number=0;
  appointmentSource:number=0;
  appointmentStatus:number=0;

  constructor(private dialog:MatDialog, private clinicService:ClinicService){
    const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 19);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 0);
  }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.clinicService.GetClinics().subscribe({
      complete:()=>{},
      next:(res:any)=>{
        this.clinics=res;
      },
      error:(e)=>{}
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  //Get appointment history of a clinic
  getAppointmentHistory(clinicid:number,appointmentStatus:number,appointmentSource:number,appointmentType:number,stdt:any,endt:any){
    this.dialog.open(AppointmentInfoComponent,{
      data:{
        cid:clinicid,
        appStatus:appointmentStatus,
        appSource:appointmentSource,
        appType:appointmentType,
        strtDate:stdt,
        enDate:endt
      }
    });
    }

  resetForm(){}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
