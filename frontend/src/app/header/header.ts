import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../service/transaction';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  user:any = {};
  @Output() search = new EventEmitter<string>();
  searchText: string = '';

  constructor(private router:Router, private api: Transaction){}

  ngOnInit(){

    const data = localStorage.getItem('user');

    if(data){
      this.user = JSON.parse(data);
    }

    console.log(this.user);
  }

  onSearch() {
    this.search.emit(this.searchText);
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
