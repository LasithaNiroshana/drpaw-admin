import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddInstitutesComponent} from '../add-institutes/add-institutes.component';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss']
})
export class InstitutesComponent {

constructor(private dialog:MatDialog){}

//Open add institute dialog
addInstitute(){
  this.dialog.open(AddInstitutesComponent);
}
}
