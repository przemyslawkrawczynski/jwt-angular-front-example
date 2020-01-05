import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AuthService, UserAuthInfo } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  dataURL: string = 'http://localhost:8080/app/user';

  constructor(private http: HttpClient,
              private authServ: AuthService) { }

  getAdminData(): Observable<UserAuthInfo> {

    return this.http.get<UserAuthInfo>(this.dataURL);
  }


}
