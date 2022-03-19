import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user : any;

  constructor(public loginService : LoginService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user  = this.loginService.getUser();
    //we are subscribing here subject or status of login
    this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn =  this.loginService.isLoggedIn();
      this.user =  this.loginService.getUser();
    });
  }

  public logout(){
    console.log('logout is clicked');
    this.loginService.logout();
    window.location.reload();
    this.snackbar.open('Logout Successfully', 'ok', {
      duration : 3000,
    })
  }

}
