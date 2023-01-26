import { Component,OnInit } from '@angular/core';
import {PetownerService} from '../common/petowner.service';

@Component({
  selector: 'app-petowners',
  templateUrl: './petowners.component.html',
  styleUrls: ['./petowners.component.scss']
})
export class PetownersComponent implements OnInit{

  petOwnersList:any=[];
  displayedColumns: string[] = ['name','nic','mobile','email','city','created_on','active'];

constructor(private petOwner:PetownerService){}

ngOnInit(){

  //Get pet owners list
  this.petOwner.GetPetOwners().subscribe((res:any)=>{
    this.petOwnersList=res;
    console.log(this.petOwnersList);
  });
}
}
