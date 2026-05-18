import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private api: Auth, private router:Router){}

  register(){
    this.api.register(this.name, this.email, this.password).subscribe({
      next:(res:any)=>{
        console.log('register response:', res);
        alert('Register Successfully! Please Login to Continue');

        this.router.navigate(['/login']);
      },
      error:(err:any)=>{
        console.log('register error:', err);
        alert('Register Failed! Please Try Again');
      }
    })
  }
}
