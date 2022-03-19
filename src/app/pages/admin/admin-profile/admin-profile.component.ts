import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  user : any = null;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

}
