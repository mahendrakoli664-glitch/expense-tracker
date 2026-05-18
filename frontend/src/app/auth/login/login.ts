import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private api: Auth, private router: Router){}

  login(){
    this.api.login(this.email, this.password).subscribe({
      next:(res:any)=>{
        console.log('login response:', res);
        alert('Login Successfully!');

        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      },
      error:(err:any)=>{
        console.log('login failed:', err);
        alert('Login Failed');
      }
    })
  }
}
