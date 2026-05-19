import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../service/transaction';
import { Search } from '../service/search';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  transaction: any[] = [];
  allTransactions: any[] = [];
  months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  monthlyExpenses: number[] = [0,0,0,0,0,0];
  editId: string | null = null;

  totalBalance = 0;
  totalIncome = 0;
  totalExpense = 0;
  totalSaving = 0;

  newTransaction = {
    title: '',
    amount: 0,
    type: '',
    date: ''
  };

  constructor(private api: Transaction, private search: Search) {}

  ngOnInit(): void {
    this.getTransaction()

    this.search.search$.subscribe((value: string) => {
      this.searchTransaction(value);
    });
  }

  getTransaction() {
    this.api.getTransactions().subscribe({
      next: (res: any) => {
        this.transaction = res;
        this.allTransactions = res;

        this.calculateTotals();
        this.chartTransaction();
      },
      error: (err) => {
        console.log(err);
        alert('Get All Expense Failed');
      }
    });
  }

  chartTransaction() {

    this.monthlyExpenses = [0, 0, 0, 0, 0, 0];

    this.transaction.forEach(tx => {

      const month = new Date(tx.date).getMonth();

      if (month < 6) {

        if (tx.type?.toLowerCase() === 'income') {
          this.monthlyExpenses[month] += Number(tx.amount);
        }

        else if (tx.type?.toLowerCase() === 'expense') {
          this.monthlyExpenses[month] -= Number(tx.amount);
        }

      }

    });

    console.log(this.monthlyExpenses);
  }

  getBarHeight(amount: number): number {

    const max = Math.max(
      ...this.monthlyExpenses.map(x => Math.abs(x)),
      1
    );

    return (Math.abs(amount) / max) * 100;
  }

  calculateTotals() {
    this.totalIncome = 0;
    this.totalExpense = 0;

    this.transaction.forEach((item) => {
      const amount = Number(item.amount);

      if (item.type?.toLowerCase() === 'income') {
        this.totalIncome += amount;
      } else if (item.type?.toLowerCase() === 'expense') {
        this.totalExpense += amount;
      }
    });

    this.totalBalance = this.totalIncome - this.totalExpense;
    this.totalSaving = this.totalBalance;
  }

  addTransaction() {

    if (this.editId) {

      this.api.updateTransaction(this.editId, this.newTransaction)
        .subscribe(() => {

          alert('Transaction Updated Successfully');

          this.getTransaction();

          this.editId = null;

          this.newTransaction = {
            title: '',
            amount: 0,
            type: '',
            date: ''
          };
        });

    } else {

      this.api.addTransaction(this.newTransaction)
        .subscribe(() => {
          console.log('added:', this.newTransaction)
          alert('Transaction Added Successfully');

          this.getTransaction();

          this.newTransaction = {
            title: '',
            amount: 0,
            type: '',
            date: ''
          };
        });
    }
  }

  editTransaction(item: any) {

    this.editId = item._id;

    this.newTransaction = {
      title: item.title,
      amount: item.amount,
      type: item.type,
      date: item.date.split('T')[0]
    };
  }

  deleteTransaction(id: string) {
    this.api.deleteTransaction(id).subscribe(() => {
      this.getTransaction();
      alert('Delete Transaction Successfully');
    });
  }

  searchTransaction(value: string) {

    if (!value || !value.trim()) {
      this.transaction = this.allTransactions;
      return;
    }

    this.transaction = this.allTransactions.filter((t: any) =>
      t.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}