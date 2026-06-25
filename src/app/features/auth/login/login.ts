import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  authService = inject(Auth);
  router = inject(Router);

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data?.accessToken!);

        if (this.authService.isUser()) {
          this.router.navigate(['game']);
        }
        if (this.authService.isAdmin()) {
          this.router.navigate(['admin', 'home']);
        }
      },
      error: (err) => {
        this.errorMessage.set(this.getErrorMessage(err));
      },
    });
  }

  private getErrorMessage(err: any): string {
    const backendError = err.error;

    if (!backendError) {
      return 'Something went wrong';
    }

    const errors = backendError.errors;

    if (typeof errors === 'string') {
      return errors;
    }

    if (Array.isArray(errors)) {
      return errors.join(', ');
    }

    if (typeof errors === 'object' && errors !== null) {
      return Object.values(errors).join(', ');
    }

    return backendError.message || 'Login failed';
  }
}
