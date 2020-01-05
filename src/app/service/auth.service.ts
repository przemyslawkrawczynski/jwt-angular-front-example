import { Injectable } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const SIGNUP_URL: string = 'http://localhost:8080/users/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtTokenInfo: JwtTokenClass = new JwtTokenClass();


  constructor(private http: HttpClient) { }



  getAuth(email: string, password: string): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(SIGNUP_URL, this.createAuthData(email, password));
  }

  getInfoFromToken() {}

  signin() { }

  logout() { }



  createAuthData(username: string, password: string): UserAuthInfo {
    const userData = {
      username: 'jbravo',
      password: 'password'
    } as UserAuthInfo;

    return userData;

  }

}

export interface UserAuthInfo {
  username: string;
  password: string;
}

export interface JwtTokenDto {
  jwtToken: string;
}

export class JwtTokenClass {

  jwtToken?: string;
  hasRole?: string;
  name?: string;
  expiresDate?: Date;
   constructor() {}



   setToken(token) {
     this.jwtToken = token;
   }
}
