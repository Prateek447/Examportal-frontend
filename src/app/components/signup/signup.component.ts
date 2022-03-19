import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'jquery';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService, private snackbar : MatSnackBar) { }


  public user = {
    username :'',
    firstname :'',
    lastname : '',
    email :'',
    password : '',
    phone : '',
  };

  ngOnInit(): void {
  }

  formSubmit(){

    if(this.user.username=='' || this.user.username == null){
       this.snackbar.open('Username is required !!', 'OK', {
         duration : 3000,
       })
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) =>{
          console.log("Success");
         // alert("Success");
         Swal.fire('Success','You are registered successfully !','success');
      },
      (error) =>{
          console.log("Something went wrong");
         // alert("Registeration Failed");
         this.snackbar.open('Registeration Failed','OK',{
           duration:3000,
         })
      }
    )
  }

}
