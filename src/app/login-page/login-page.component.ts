import { Component, OnInit } from '@angular/core';
import { AuthService, JwtTokenClass } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  jwtToken: JwtTokenClass = new JwtTokenClass();
  name: any;
  role: string;
  expDate: Date;
  dateToShow: string = '';

constructor(private authService: AuthService) { }


ngOnInit() {
}

login(formData: NgForm) {
  this.authService.getAuth(formData.form.value.email, formData.form.value.password)
    .subscribe(token => {
      this.jwtToken.setToken(token.jwtToken.toString());
    });
}

showDecodedData() {
  let val = jwt_decode(this.jwtToken.jwtToken);
  this.jwtToken.name = val.sub;
  console.log(val.sub)
  this.jwtToken.hasRole = val.auth[0].authority;
  this.jwtToken.expiresDate = val.exp;
  this.getDataFormat(val.exp);
}

getDataFormat(unix_timestamp): void {
  let actualDate = new Date(unix_timestamp * 1000);
  let year = actualDate.getFullYear();
  let month = (actualDate.getMonth() + 1) < 10 ? '0' + (actualDate.getMonth() + 1) : (actualDate.getMonth() + 1);
  let date = actualDate.getDate();
  let hour = actualDate.getHours();
  let min = actualDate.getMinutes() < 10 ? '0' + actualDate.getMinutes() : actualDate.getMinutes();
  let sec = actualDate.getSeconds();
  let time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
  console.log(time);
  this.dateToShow = time;
}

signup() { }
}
