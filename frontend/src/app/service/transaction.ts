import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Transaction {

  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Get all transactions
  getTransactions() {
    return this.http.get(`${this.baseUrl}/expense`);
  }

  // Add transaction
  addTransaction(data: any) {
    return this.http.post(`${this.baseUrl}/expense`, data);
  }

  // Delete transaction
  deleteTransaction(id: string) {
    return this.http.delete(`${this.baseUrl}/expense/${id}`);
  }

  // Update transaction
  updateTransaction(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/expense/${id}`, data);
  }
}