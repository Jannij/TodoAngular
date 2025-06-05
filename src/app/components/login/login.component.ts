import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css'],
  imports: [
    NgIf,
    FormsModule,
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (): void => {
        this.router.navigate(['/']); // Navigate to your home or todo page
      },
      error: (): void => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
