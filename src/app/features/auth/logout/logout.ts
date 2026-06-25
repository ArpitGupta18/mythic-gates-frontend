import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  authService = inject(Auth);
  router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.router.navigate(['login'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
