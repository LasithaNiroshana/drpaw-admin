import { Component } from '@angular/core';
import {LoginpageComponent} from '../../loginpage/loginpage.component';
import { Router } from '@angular/router';
import {GlobalService} from '../../common/global.service';
import {LoginService} from '../../common/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpinnerService} from '../../common/spinner.service';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.scss']
})
export class ConfirmLogoutComponent {

  constructor(private router:Router){}

  logout(){
    this.router.navigate(['/login']);
  }
}
