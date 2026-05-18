import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../service/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {

  transaction = {
    title: '',
    amount: 0,
    type: '',
    date: ''
  };

  editMode: string | null = null;

  constructor(
    private api: Transaction,
    private router: Router
  ) {}

  ngOnInit() {
    const item = history.state.transaction;

    if (item) {
      this.getEdit(item);
    }
  }

  addTransactions() {

    if (this.editMode) {

      this.api.updateTransaction(
        this.editMode,
        this.transaction
      ).subscribe(() => {

        alert('Transaction Updated Successfully');

        this.editMode = null;

        this.transaction = {
          title: '',
          amount: 0,
          type: '',
          date: ''
        };

        this.router.navigate(['/list-transaction']);
      });

    } else {

      this.api.addTransaction(this.transaction)
        .subscribe(() => {

          alert('Added Successfully!');

          this.transaction = {
            title: '',
            amount: 0,
            type: '',
            date: ''
          };

          this.router.navigate(['/list-transaction']);
        });
    }
  }

  getEdit(item: any) {
    this.editMode = item._id;

    this.transaction = {
      title: item.title,
      amount: item.amount,
      type: item.type,
      date: item.date.split('T')[0]
    };
  }
}