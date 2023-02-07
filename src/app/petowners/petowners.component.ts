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
  petowners:number=0;

constructor(private petOwner:PetownerService){}

ngOnInit(){

  //Get pet owners list
  this.petOwner.GetPetOwners().subscribe((res:any)=>{
    this.petOwnersList=res;
    res.forEach((petowner:any) => {
      if(petowner.active){
        this.petowners=this.petowners+1;
      }
      console.log(this.petowners);
    });
  });
}
}
