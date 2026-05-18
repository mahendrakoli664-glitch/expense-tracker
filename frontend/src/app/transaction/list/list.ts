import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../../service/transaction';

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit{
  transactions: any[] = [];
  editMode: string | null = null;

  constructor(private api: Transaction, private cd: ChangeDetectorRef, private router: Router){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log('List:', res);
        this.transactions = res;
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
}
