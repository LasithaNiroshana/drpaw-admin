import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.component.html',
  styleUrls: ['./otppage.component.scss']
})
export class OtppageComponent {

  constructor(private router:Router){}

  signIn(){
    this.router.navigate(['/home']);
  }

  resendOTP(){
    this.router.navigate(['/login'])
  }
}
