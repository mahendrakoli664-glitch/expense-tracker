import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../service/transaction';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class Report implements OnInit{
  totalIncome = 0;
  totalExpense = 0;
  totalSaving = 0;

  transaction: any[] = [];
  months: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  monthlyExpenses: number[] = [0,0,0,0,0,0];
  categoryData = [
    { name: 'Food', amount: 0, percent: 0 },
    { name: 'Shopping', amount: 0, percent: 0 },
    { name: 'Travel', amount: 0, percent: 0 },
    { name: 'Utility', amount: 0, percent: 0 }
  ];

  pieChartStyle = '';

  constructor(private api: Transaction){}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction() {
    this.api.getTransactions().subscribe({
      next: (res: any) => {
        this.transaction = res;

        alert('Get All Reports Loaded');

        this.calculateTotals();
        this.chartTransaction();
        this.calculateCategorySplit();
      },
      error: (err) => {
        console.log(err);
        alert('Get All Reports Failed');
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

    this.totalSaving = this.totalIncome - this.totalExpense;
  }

  calculateCategorySplit() {

    this.categoryData.forEach(cat => {
      cat.amount = 0;
      cat.percent = 0;
    });

    this.transaction.forEach(item => {

      if (item.type?.toLowerCase() === 'expense') {

        const title = item.title?.toLowerCase();

        if (title.includes('food'))
          this.categoryData[0].amount += Number(item.amount);

        else if (title.includes('shopping'))
          this.categoryData[1].amount += Number(item.amount);

        else if (title.includes('travel'))
          this.categoryData[2].amount += Number(item.amount);

        else if (title.includes('utility'))
          this.categoryData[3].amount += Number(item.amount);
      }
    });

    // total pehle
    const total = this.categoryData.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    // phir percent
    this.categoryData.forEach(cat => {
      cat.percent = total > 0
        ? Math.round((cat.amount / total) * 100)
        : 0;
    });

    if (total > 0) {

      const food = this.categoryData[0].percent;
      const shopping = this.categoryData[1].percent;
      const travel = this.categoryData[2].percent;
      const utility = this.categoryData[3].percent;

      this.pieChartStyle = `
      conic-gradient(
        green 0% ${food}%,
        blue ${food}% ${food + shopping}%,
        orange ${food + shopping}% ${food + shopping + travel}%,
        red ${food + shopping + travel}% 100%
      )
    `;
    }

    console.log(this.categoryData);
  }
}
