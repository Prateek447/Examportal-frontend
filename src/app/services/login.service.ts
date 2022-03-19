import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  parsedUser : any = null

  //this is used when user is login then inform all the subscriber of this subject
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

//for generating the token
   public generateToken(loginData : any){
     console.log('Generating the token');
     return this.http.post(baseUrl+'/generate-token',loginData);
  }

  //get current user from the server or user associate with the token
  public getCurrentUser(){
   let user = this.http.get(baseUrl+'/current-user');
   return user;
  }

  //save token to the local storage
  public saveLoginToken(token : any){
    localStorage.setItem('token',token);
    return true;
  }


  //check user is logged in or not
  public isLoggedIn(){
    let token  =  localStorage.getItem('token');
    if(token == undefined || token == '' || token == null)
    return false;
    return true;
  }

  //for logout
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  //got getting token from the local storage
  public getTokenFromLocal(){
    return localStorage.getItem('token');
  }

 //for setting user in the local storage
 public setUser(user : any){
  localStorage.setItem('user',  JSON.stringify(user));
 }

 //for getting the user from local
 public getUser(){
   this.parsedUser  =  localStorage.getItem('user');
   if( this.parsedUser !=null || this.parsedUser != ''){
     return JSON.parse(this.parsedUser);
   }
   else{
     this.logout();
     return null;
   }
 }

 //for getting the user role
 public getUserRole(){
   let user = this.getUser();
   //return single user role
   return user.authorities[0].authority;
 }

}
