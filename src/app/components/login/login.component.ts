import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginData = {
     username : '',
     password : ''
   }

  constructor(private snackbar : MatSnackBar, private loginService : LoginService, private route : Router) { }

  ngOnInit(): void {
  }

  loginFormSubmit(){
    // alert("Button click");
    if(this.loginData.username.trim()=='' || this.loginData.username == null){
       this.snackbar.open("Username is required !", "OK", {
         duration : 3000,
       })
       return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password == null){
      this.snackbar.open("Password is required !", "OK", {
        duration : 3000,
      })
      return;
   }

   //request server to generate token
     this.loginService.generateToken(this.loginData).subscribe(
       (data : any) => {
         console.log("Success");
         //save the token in local
         
         this.loginService.saveLoginToken(data.token);
         //get the current user from server and save it in local
         console.log('getting current user');
         this.loginService.getCurrentUser().subscribe(
           (user : any) => {
            console.log('saving the user-->'+user);
           this.loginService.setUser(user);
  
            if(this.loginService.getUserRole() == 'ADMIN'){
              //window.location.href = '/admin-dashboard'
              this.route.navigate(['admin-dashboard']);
              //setting the status of login to the suject
              this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole() == 'NORMAL'){
            //  window.location.href = '/user-dashboard'
            this.route.navigate(['user-dashboard/quizes/'+0]);
             //setting the status of login to the suject
             this.loginService.loginStatusSubject.next(true);
            }
            else{
              this.loginService.logout();
            }

           },
           (error) => {
             console.log('failed to get current user');
            console.log(error);
            this.snackbar.open("Invalid Credentials || Try again", "ok",  {
              duration : 3000,
            })
           }
         )
       },
       (error)=>{
          console.log("Error occured");
          console.log(error);
          this.snackbar.open("Invalid Credentials || Try again", "ok",  {
            duration : 3000,
          })
       }
     )
  }

}
