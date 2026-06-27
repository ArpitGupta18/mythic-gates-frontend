import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Logout } from '../../../features/auth/logout/logout';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, startWith, tap } from 'rxjs';
import { User } from '../../services/user';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, Logout, RouterLinkActive, MatIconModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private router = inject(Router);
  private userService = inject(User);
  private toastService = inject(Toast);

  toast = this.toastService.toast;

  user = this.userService.profile;

  currentUrl$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url),
    startWith(this.router.url),
  );

  hasOverlay = false;

  constructor() {
    this.currentUrl$.subscribe((url) => {
      this.hasOverlay =
        url.includes('/game/bosses') ||
        url.includes('/game/characters') ||
        url === '/game/battles' ||
        url.includes('/game/shop');
    });
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    return this.userService.getProfile().subscribe();
  }
}
