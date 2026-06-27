import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { BattleService } from '../../../core/services/battle.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  private battleService = inject(BattleService);

  playGame() {
    this.battleService.getOngoingBattle().subscribe({
      next: (response) => {
        this.router.navigate(['game/battles', response.data!.battleId]);
      },
      error: (err) => {
        if (err.status === 404) {
          this.router.navigate(['game/battle/start/characters']);
        }
      },
    });
  }
}
