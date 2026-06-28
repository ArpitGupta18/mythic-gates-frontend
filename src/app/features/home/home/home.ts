import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BattleService } from '../../../core/services/battle.service';
import { BattleResponse } from '../../../core/models/battle/battle-response';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  private battleService = inject(BattleService);

  ongoingBattle = signal<BattleResponse | null>(null);
  loadingBattle = signal(false);

  ngOnInit() {
    this.loadOnGoingBattle();
  }

  loadOnGoingBattle() {
    this.loadingBattle.set(true);

    this.battleService.getOngoingBattle().subscribe({
      next: (response) => {
        this.ongoingBattle.set(response.data);
        this.loadingBattle.set(false);
      },
      error: () => {
        this.ongoingBattle.set(null);
        this.loadingBattle.set(false);
      },
    });
  }

  startNewBattle() {
    if (this.ongoingBattle()) return;

    this.router.navigate(['game/battle/start/characters']);
  }

  continueBattle() {
    const battle = this.ongoingBattle();

    if (!battle) return;

    this.router.navigate(['game/battles', battle.battleId]);
  }
}
