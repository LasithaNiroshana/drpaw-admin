import { Component,OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { DatePipe } from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {PaymentService} from '../../../common/payment.service';
import {ClinicService} from '../../../common/clinic.service';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentInfoComponent} from '../appointment-info/appointment-info.component';

//Interface for payment details
export interface ClinicDetails {
  id:number;
  name: string;
  clinic_type:string;
  nic:string;
  address:string;
  city:string;
  logo:string;
  active:number;
  created_on:string;
  province:string;
  district:string;
  br_no:string;
  contact_person:string;
  landline:string;
  mobile: string;
  email:string;
  website:string;
  bank_name:string;
  bank_acc_holder:string;
  bank_acc_no:string;
  bank_branch:string;
  bank_branch_code:string;
  sale:number;
}

@Component({
  selector: 'app-appointment-transactions-filter-form',
  templateUrl: './appointment-transactions-filter-form.component.html',
  styleUrls: ['./appointment-transactions-filter-form.component.scss']
})
export class AppointmentTransactionsFilterFormComponent implements OnInit,OnDestroy,AfterViewInit {
  today = new Date();
  appointmentHistory:any=[];
  minDate1: Date; //minDate
  maxDate1: Date; //maxDate
  minDate2: Date; //minDate
  maxDate2: Date; //maxDate
  clinicID:any=[{id:0}];  //ClinicID
  appointmentSource:number=2;
  appointmentType:number=3;
  appointmentStatus:number=0;

  isChecked: boolean = false;
  customValue: string = 'customValue';

  myControl = new FormControl<string | ClinicDetails>('');
  clinics: ClinicDetails[] = []; // Initialize as an empty array
  filteredOptions!: Observable<ClinicDetails[]>;

  startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  endDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

  constructor(private dialog:MatDialog, private clinicService:ClinicService, private datePipe: DatePipe){
    const currentYear = new Date().getFullYear();
  //Setting up minimum and maximum dates for calendars
    this.minDate1 = new Date(currentYear - 1, 0, 1);
    this.maxDate1 = new Date(currentYear - 0, 0, 19);
    this.minDate2 = new Date(currentYear - 1, 0, 1);
    this.maxDate2 = new Date(currentYear - 0, 0, 0);
    this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
  }
  ngAfterViewInit() {
    //Get clinic list
    this.clinicService.GetClinics().subscribe({
      complete:()=>{},
      next:(res:any)=>{
        this.clinics=res;
      },
      error:(e)=>{}
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.clinics.slice(); // Use this.users instead of options
      }),
    );
  }
  ngOnDestroy(){
  }

  ngOnInit() {
   
  }

  //Get appointment history of a clinic
  getAppointmentHistory(clinic:any,appointmentStatus:number,appointmentSource:number,appointmentType:number,stdt:any,endt:any){
    this.dialog.open(AppointmentInfoComponent,{
      data:{
        cid:clinic,
        appStatus:appointmentStatus,
        appSource:appointmentSource,
        appType:appointmentType,
        strtDate:stdt,
        enDate:endt
      }
    });
    console.log(clinic.id);
    }

  resetForm(){}

  // Method to handle appointment source change event
  onAppSourceChange(value: number) {
    this.appointmentSource = value;
  }

  // Method to handle appointment sub type change event
  onAppTypeChange(value: number) {
    this.appointmentType = value;
  }

  displayFn(clinic: ClinicDetails): string {
    return clinic && clinic.name ? clinic.name : '';
  }

  private _filter(name: string): ClinicDetails[] {
    const filterValue = name.toLowerCase();
    var clinicList=this.clinics;

    return clinicList.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  
}
