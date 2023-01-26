import { Component } from '@angular/core';
import {AddClinicComponent} from './clinics/add-clinic/add-clinic.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  constructor(private dialog:MatDialog){}

  
  //Open more payment information about clinic
  addClinic(){
    this.dialog.open(AddClinicComponent);
}
}
