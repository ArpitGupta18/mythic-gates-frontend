import { inject, Service, signal } from '@angular/core';
import { RegisterRequest } from '../../features/auth/models/register-request';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { RegisterResponse } from '../../features/auth/models/register-response';
import { LoginRequest } from '../../features/auth/models/login-request';
import { LoginResponse } from '../../features/auth/models/login-response';
import { finalize, tap } from 'rxjs';

@Service()
export class Auth {
  private readonly apiUrl = 'http://localhost:9090/api/auth';

  isLoggedIn = signal<boolean>(this.isAuthenticated());

  http = inject(HttpClient);

  register(request: RegisterRequest) {
    return this.http.post<ApiResponse<RegisterResponse>>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, request);
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
    this.isLoggedIn.set(true);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  logout() {
    return this.http
      .post<ApiResponse<null>>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        finalize(() => {
          localStorage.removeItem('accessToken');
          this.isLoggedIn.set(false);
        }),
      );
  }

  public isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  getRole(): string | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  isUser(): boolean {
    return this.getRole() === 'ROLE_USER';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
