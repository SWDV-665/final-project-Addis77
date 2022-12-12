import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _httpClient:HttpClient) { }

  postExpense(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.post(`${environment.apiUrl}/expenses`,data,httpOptions)
  }
  putExpense(data,id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.put(`${environment.apiUrl}/expenses/`+id,data,httpOptions)
  }
  deleteExpense(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.delete(`${environment.apiUrl}/expenses/`+data._id,httpOptions)
  }
  getAllExpenses(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/expenses`,httpOptions)
  }  
  getExpenses(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/expenses/`+id,httpOptions)
  }
  getExpensesCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization':'Bearer ' + this.getToken()
      })
    }; 
    return this._httpClient.get(`${environment.apiUrl}/categories`,httpOptions)
  }
  getToken(){
    let token =  JSON.parse(localStorage.getItem('token'))
    console.log(token);
    return token.token;
   }
}
