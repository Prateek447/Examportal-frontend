import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class Auth_Interceptor implements HttpInterceptor{

    constructor(private service : LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let authReq =req; 
      const token =  this.service.getTokenFromLocal();
      if(token!=null){

       authReq = authReq.clone({
           setHeaders : {Authorization : 'Bearer'+' '+token},
       });
      }
      //console.log('Headers---->'+authReq.headers.get('Authorization'));
      return next.handle(authReq);
    }

}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : Auth_Interceptor,
        multi : true,
    },
];