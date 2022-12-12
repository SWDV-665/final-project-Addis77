import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  constructor(private _httpClient:HttpClient) { }

  postIncome(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.post(`${environment.apiUrl}/incomes`,data,httpOptions)
  }
  putIncome(data,id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.put(`${environment.apiUrl}/incomes/`+id,data,httpOptions)
  }
  deleteIncome(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.delete(`${environment.apiUrl}/incomes/`+data._id,httpOptions)
  }
  getAllIncomes(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/incomes`,httpOptions)
  }  
  getIncomes(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/incomes/`+id,httpOptions)
  }
  getToken(){
    let token =  JSON.parse(localStorage.getItem('token'))
    console.log(token);
    return token.token;
   }
}
