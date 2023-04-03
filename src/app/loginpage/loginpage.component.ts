import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../common/global.service';
import {LoginService} from '../common/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpinnerService} from '../common/spinner.service'

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

constructor(private router:Router,public globalService:GlobalService, private loginService:LoginService, private snackbar:MatSnackBar, private spinner:SpinnerService){}
loading$ = this.spinner.loading$;
tk='';

//Signin function
LogIn(){
  var tkn:string;
  this.spinner.show();
  if(this.user.username==""){
    this.openSnackBar('Please enter username','OK');
    this.spinner.hide();
  }
  else if(this.user.password==""){
    this.openSnackBar('Please enter password!','OK');
    this.spinner.hide();
  }
  else{
    this.loginService.getToken(this.user).subscribe({
      next:(res:any)=>{
        tkn=res.token;
        localStorage.setItem('token',tkn);
      },
      error:(e)=>{
        this.openSnackBar('Error while logging in!','OK');
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
         this.router.navigate(['/home']);
        //  console.log(this.globalService.token);
      }
    });
  }
}

//Open snackbar 
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action);
}

}
