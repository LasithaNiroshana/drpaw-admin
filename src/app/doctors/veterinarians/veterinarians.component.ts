import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddVetComponent} from '../add-vet/add-vet.component';

@Component({
  selector: 'app-veterinarians',
  templateUrl: './veterinarians.component.html',
  styleUrls: ['./veterinarians.component.scss']
})
export class VeterinariansComponent {

  constructor(private dialog:MatDialog){}
  //Open add doctor dialog
addDoctor(){
  this.dialog.open(AddVetComponent);
}

}
