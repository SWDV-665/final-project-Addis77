import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _httpClient:HttpClient) { }

  postCategory(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.post(`${environment.apiUrl}/categories`,data,httpOptions)
  }
  putCategory(data,id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.put(`${environment.apiUrl}/categories/`+id,data,httpOptions)
  }
  deleteCategory(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.delete(`${environment.apiUrl}/categories/`+data._id,httpOptions)
  }
  getAllCategorys(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/categories`,httpOptions)
  }  
  getCategorys(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/categories/`+id,httpOptions)
  }
  getToken(){
    let token =  JSON.parse(localStorage.getItem('token'))
    console.log(token);
    return token.token;
   }
}
