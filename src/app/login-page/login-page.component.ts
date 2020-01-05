import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { AdminDataService } from '../service/admin-data.service';
import { UserDataService } from '../service/user-data.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  name: any = '';
  hasRole: string = '';
  expiresDate: Date = null;
  dateToShow: string = '';
  roleAdminText: string = '';
  jwtToken: string = 's';

constructor(private authService: AuthService,
            private adminDataService: AdminDataService,
            private userDataService: UserDataService) { }


ngOnInit() {
}

login(formData: NgForm) {
  this.authService.getAuth(formData.form.value.username, formData.form.value.password).subscribe
  (jwt => {
    this.authService.userJwtInfo.jwtToken = jwt.jwtToken;
    this.jwtToken = jwt.jwtToken;
  });
}

actualizeInfo() {
  return () => this.authService.getInfoFromToken(this.jwtToken);
}

showDecodedData() {
  let info = this.actualizeInfo();
  info();
  this.name = this.authService.userJwtInfo.userName;
  // this.hasRole = this.authService.getRole();
  // this.expiresDate = this.authService.getExpiresDate();
  // this.dateToShow = this.authService.getDateToShow();
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
  this.dateToShow = time;
}

signup() { }

getDataAdminRole() {
  this.adminDataService.getAdminData().subscribe(data => {
    this.roleAdminText = data;
  },
  error => {
    console.log(error);
  });
}

}
