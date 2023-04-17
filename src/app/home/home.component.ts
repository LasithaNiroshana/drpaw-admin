import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import {ConfirmLogoutComponent} from './confirm-logout/confirm-logout.component';



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showFiller = false;
  showRefundsFiller = false;

  constructor(private dialog:MatDialog) {}

  confirmLogout(){
    this.dialog.open(ConfirmLogoutComponent);
  }
  
}
