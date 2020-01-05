import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    let isLoggedin = this.authServ.isLoggedIn();
    let token = 'Bearer ' + this.authServ.userJwtInfo.jwtToken;
    var authReq = request.clone({
      headers: new HttpHeaders({
        'Authorization': token,
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    });

    if (isLoggedin) {
      console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
    } else {

      return next.handle(request);
    }
  }
}
