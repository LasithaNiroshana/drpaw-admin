import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../common/global.service';
import {LoginService} from '../common/login.service';

export interface userDetails{
  username:string;
  password:string;
}

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {
user:userDetails={
  username:"",
  password:""
}

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
constructor(private router:Router,public globalService:GlobalService, private loginService:LoginService){}

//Signin function
signIn(){
  // console.log(this.user);
  // this.loginService.getToken(this.user).subscribe({
  //   next:(res:any)=>{
  //     console.log(res);
  //   },
  //   error:(e)=>{
  //     console.log(e);
  //   }
  // });
  this.router.navigate(['/home']);
}
}
