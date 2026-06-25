import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Logout } from '../../../features/auth/logout/logout';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, Logout, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
