import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private router: Router, private authService: Auth) {}

  goToCharacters() {
    this.router.navigate(['characters']);
  }
}
