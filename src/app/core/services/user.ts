import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { UserProfile } from '../models/user-profile';
import { tap } from 'rxjs';

@Service()
export class User {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  private readonly emptyProfile: UserProfile = {
    publicId: '',
    username: '',
    email: '',
    role: '',
    gold: 0,
    bossesDefeated: 0,
  };
  private readonly _profile = signal<UserProfile | null>(this.emptyProfile);

  readonly profile = this._profile.asReadonly();

  http = inject(HttpClient);

  getProfile() {
    return this.http.get<ApiResponse<UserProfile | null>>(`${this.apiUrl}/me`).pipe(
      tap(({ data }) => {
        this._profile.set(data);
      }),
    );
  }

  clearProfile() {
    this._profile.set(this.emptyProfile);
  }

  getCurrentUser() {
    return this.http.get<ApiResponse<UserProfile | null>>(`${this.apiUrl}/me`)
      .subscribe({
        next: (res) => this._profile.set(res.data),
      })
  }
}
