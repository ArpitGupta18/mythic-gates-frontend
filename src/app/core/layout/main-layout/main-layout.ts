import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Logout } from '../../../features/auth/logout/logout';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, Logout],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
