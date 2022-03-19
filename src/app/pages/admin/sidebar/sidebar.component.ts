import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService : LoginService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
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
