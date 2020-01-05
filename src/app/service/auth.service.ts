import { Injectable } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';



const SIGNUP_URL: string = 'http://localhost:8080/users/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userJwtInfo: JwtUserInformation = new JwtUserInformation();


  constructor(private http: HttpClient) { }

  getAuth(username: string, password: string): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(SIGNUP_URL, this.createAuthData(username, password));
  }

  getJwtToken(): string {
    return this.userJwtInfo.jwtToken;
  }

  getInfoFromToken(token) {
    console.log(token);
    let val = jwt_decode(token);
    this.userJwtInfo.userName = val.sub;
    this.userJwtInfo.hasRole = (val.auth[0].authority);
    this.userJwtInfo.expiresDate = val.exp;
    this.userJwtInfo.expiresDateToShow = this.setDataFormat(val.exp);
  }

  isLoggedIn(): boolean {
    return this.userJwtInfo.isLogged;
  }

  logout() {
    //
  }

  createAuthData(username: string, password: string): UserAuthInfo {
    const userData = {
      username: 'jbravo',
      password: 'password'
    } as UserAuthInfo;

    return userData;
  }


  setDataFormat(unix_timestamp): string {
    let actualDate = new Date(unix_timestamp * 1000);
    let year = actualDate.getFullYear();
    let month = (actualDate.getMonth() + 1) < 10 ? '0' + (actualDate.getMonth() + 1) : (actualDate.getMonth() + 1);
    let date = actualDate.getDate();
    let hour = actualDate.getHours();
    let min = actualDate.getMinutes() < 10 ? '0' + actualDate.getMinutes() : actualDate.getMinutes();
    let sec = actualDate.getSeconds();
    let time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

}

export interface UserAuthInfo {
  username: string;
  password: string;
}

export interface JwtTokenDto {
  jwtToken: string;
}

export class JwtUserInformation {
  isLogged: boolean = false;
  jwtToken?: string;
  hasRole?: string;
  userName?: string;
  expiresDate?: Date;
  expiresDateToShow?: string;
}
