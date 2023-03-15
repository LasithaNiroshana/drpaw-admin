import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PetownerService} from '../common/petowner.service';

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
export class PetownersComponent implements OnInit,AfterViewInit{

  petOwnersList:any=[];
  displayedColumns: string[] = ['name','mobile','email','city','created_on','active'];
  petowners:number=0;
  dataSource: MatTableDataSource<PetOwnerDetails> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private petOwner:PetownerService){}

  ngAfterViewInit() {
     //Get pet owners list
  this.petOwner.GetPetOwners().subscribe((res:any)=>{
    this.petOwnersList=res;
    this.dataSource = new MatTableDataSource(this.petOwnersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    res.forEach((petowner:any) => {
      if(petowner.active){
        this.petowners=this.petowners+1;
      }
      console.log(this.petowners);
    });
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
}
