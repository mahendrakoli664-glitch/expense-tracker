import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Search } from '../service/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  user:any = {};
  searchText: string = '';

  constructor(private router:Router, private search: Search){}

  ngOnInit(){

    const data = localStorage.getItem('user');

    if(data){
      this.user = JSON.parse(data);
    }

    console.log(this.user);
  }

  onSearch() {
    this.search.setSearch(this.searchText);
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
