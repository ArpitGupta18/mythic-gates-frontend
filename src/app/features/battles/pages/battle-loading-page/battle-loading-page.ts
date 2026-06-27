import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleService } from '../../../../core/services/battle.service';

@Component({
  selector: 'app-battle-loading-page',
  imports: [],
  templateUrl: './battle-loading-page.html',
  styleUrl: './battle-loading-page.scss',
})
export class BattleLoadingPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private battleService = inject(BattleService);

  characterId = this.route.snapshot.params['characterId'];
  bossId = this.route.snapshot.params['bossId'];

  ngOnInit() {
    setTimeout(() => {
      this.startBattle();
    }, 4000);
  }
  startBattle() {
    this.battleService.startBattle(this.characterId, this.bossId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['game/battles', response.data!.battleId]);
        },
        error: (err) => {
          console.log("Another battle already in progress");
        }
      })
  }
}
