import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../../service/transaction';
import { Search } from '../../service/search';

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit{
  transactions: any[] = [];
  allTransactions: any[] = [];
  editMode: string | null = null;

  constructor(private api: Transaction, private cd: ChangeDetectorRef, private router: Router, private search: Search){}

  ngOnInit(): void {
    this.getList();

    this.search.search$.subscribe((value: string) => {
      this.searchTransaction(value);
    });
  }

  getList(){
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log('List:', res);
        this.transactions = res;
        this.allTransactions = res;
        this.cd.detectChanges();
      },
      error:(err:any)=>{
        console.log('list failed:', err);
      }
    })
  }

  getEdit(item: any) {
    this.router.navigate(
      ['/add-transaction'],
      {
        state: { transaction: item }
      }
    );
  }

  searchTransaction(value: string) {

    if (!value || !value.trim()) {
      this.transactions = this.allTransactions;
      return;
    }

    this.transactions = this.allTransactions.filter((t: any) =>
      t.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}
