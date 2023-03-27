import { Component,OnInit,AfterViewInit,ViewChild,AfterContentChecked,ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {PetownerService} from '../common/petowner.service';
import {SpinnerService} from '../common/spinner.service';

export interface PetOwnerDetails{
  id:number;
  clinic:number;
  gender:string;
  name:string;
  lname:string;
  mobile:string;
  whatsapp:string;
  email:string;
  address:string;
  address1:string;
  city:string;
  province:string;
  district:string;
  created_on:string;
  active:number;
  country_code:number;
  passport:string;
  nationality:string;
  app_discount:number;
  dob:string;
  login:any;
}

@Component({
  selector: 'app-petowners',
  templateUrl: './petowners.component.html',
  styleUrls: ['./petowners.component.scss']
})
export class PetownersComponent implements OnInit,AfterViewInit,AfterContentChecked{

  petOwnersList:any=[];
  displayedColumns: string[] = ['name','mobile','email','city','created_on','active'];
  petowners:number=0;
  dataSource: MatTableDataSource<PetOwnerDetails> = new MatTableDataSource();

  loading$ = this.spinner.loading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private petOwner:PetownerService, private spinner:SpinnerService, private cdr:ChangeDetectorRef, private snackbar:MatSnackBar){
  this.cdr.detach();
}

ngAfterContentChecked() {
  this.cdr.detectChanges();
}

  ngAfterViewInit() {
     //Get pet owners list
     this.spinner.show();
  this.petOwner.GetPetOwners().subscribe({
    complete:()=>this.spinner.hide(),
    next:(res:any)=>{
      this.petOwnersList=res;
      if(this.petOwnersList==0){
        this.openSnackBar('There are no pet owners to show!','OK');
      }
      else{
        this.dataSource = new MatTableDataSource(this.petOwnersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      res.forEach((petowner:any) => {
        if(petowner.active){
          this.petowners=this.petowners+1;
        }
      });
      }
    },
    error:(e)=>{
      this.spinner.hide();
      this.openSnackBar('Error getting pet owners! Please try again.','OK');
    }
  });
  }

ngOnInit(){}

 
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

//Open snackbar 
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

}
