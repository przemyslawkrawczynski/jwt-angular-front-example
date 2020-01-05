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

  jwtTokenInfo: JwtTokenInfo = new JwtTokenInfo();


  constructor(private http: HttpClient) { }



  getAuth(email: string, password: string): Observable<JwtTokenDto> {
    let data: Observable<JwtTokenDto> = this.http.post<JwtTokenDto>(SIGNUP_URL, this.createAuthData(email, password));
    data.subscribe(jwtToken => {
      this.jwtTokenInfo.setToken(jwtToken);
    })
    this.getInfoFromToken();
    console.log(JSON.stringify(this.jwtTokenInfo));
    return data;
  }

  getInfoFromToken() {
    let val = jwt_decode(this.jwtTokenInfo.jwtToken);
    this.jwtTokenInfo.name = val.sub;
    this.jwtTokenInfo.hasRole = val.auth[0].authority;
    this.jwtTokenInfo.expiresDate = val.exp;
    this.setDataFormat(val.exp);
    this.jwtTokenInfo.isLoggedIn = true;
  }

  isLoggedIn(): boolean {
    return this.jwtTokenInfo.isLoggedIn;
  }

  getTokenToRest():string {
    if (this.isLoggedIn) {
      return 'Bearer ' + this.jwtTokenInfo.jwtToken;
    }
  }

  logout() {
    this.jwtTokenInfo = new JwtTokenInfo();
  }



  createAuthData(username: string, password: string): UserAuthInfo {
    const userData = {
      username: 'jbravo',
      password: 'password'
    } as UserAuthInfo;

    return userData;

  }

  setDataFormat(unix_timestamp): void {
    let actualDate = new Date(unix_timestamp * 1000);
    let year = actualDate.getFullYear();
    let month = (actualDate.getMonth() + 1) < 10 ? '0' + (actualDate.getMonth() + 1) : (actualDate.getMonth() + 1);
    let date = actualDate.getDate();
    let hour = actualDate.getHours();
    let min = actualDate.getMinutes() < 10 ? '0' + actualDate.getMinutes() : actualDate.getMinutes();
    let sec = actualDate.getSeconds();
    let time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    this.jwtTokenInfo.expiresDateToShow = time;
  }

}

export interface UserAuthInfo {
  username: string;
  password: string;
}

export interface JwtTokenDto {
  jwtToken: string;
}

export class JwtTokenInfo {
  isLoggedIn: boolean = false;
  jwtToken?: string;
  hasRole?: string;
  name?: string;
  expiresDate?: Date;
  expiresDateToShow?: string;

   constructor() {}

   setToken(token) {
     this.jwtToken = token;
   }
}
