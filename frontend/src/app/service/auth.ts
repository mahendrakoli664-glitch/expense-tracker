import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  basisUrl = 'http://localhost:5000/api';

  constructor(private http:HttpClient){}

  register(name: string, email:string, password: string){
    return this.http.post(`${this.basisUrl}/auth/register`, {name, email, password});
  }

  login(email: string, password: string){
    return this.http.post(`${this.basisUrl}/auth/login`, {email, password});
  }
}
