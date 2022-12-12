import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _httpClient:HttpClient) { }

  postExpense(data){
    return this._httpClient.post(`${environment.apiUrl}/expenses/list`,data)
  }
  putExpense(data){
    return this._httpClient.post(`${environment.apiUrl}/expenses/list`,data)
  }
  deleteExpense(data){
    return this._httpClient.delete(`${environment.apiUrl}/expenses/list`,data.id)
  }
  getExpenses(){
    return this._httpClient.get(`${environment.apiUrl}/expenses/list`)
  }
}
