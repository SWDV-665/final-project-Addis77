import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser= new BehaviorSubject<any>(null);

  constructor(private _httpClient:HttpClient) { }

  register(data){
    return this._httpClient.post(`${environment.apiUrl}/auth/register`,data)
  }
  login(data){
    return this._httpClient.post(`${environment.apiUrl}/auth/login`,data)
  }
  logout(){
    return this._httpClient.get(`${environment.apiUrl}/auth/logout`)
  }
  getUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/auth/me`,httpOptions)
  }
  updateUser(data){
    return this._httpClient.post(`${environment.apiUrl}/auth/update-details`,data)
  }
  getToken(){
   let token =  JSON.parse(localStorage.getItem('token'))
   console.log(token);
   return token.token;
  }
}
