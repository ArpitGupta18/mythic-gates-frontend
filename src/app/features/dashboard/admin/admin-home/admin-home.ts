import { Component } from '@angular/core';
import { Logout } from '../../../auth/logout/logout';

@Component({
  selector: 'app-admin-home',
  imports: [Logout],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.scss',
})
export class AdminHome {}
