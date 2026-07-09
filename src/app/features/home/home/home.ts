import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleService } from '../../../core/services/battle.service';
import { BattleResponse } from '../../../core/models/battle/battle-response';
import { MatIconModule } from '@angular/material/icon';
import { Toast } from '../../../core/services/toast';
import { User } from '../../../core/services/user';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  private battleService = inject(BattleService);
  private route = inject(ActivatedRoute);
  private toast = inject(Toast);
  private userService = inject(User);

  ongoingBattle = signal<BattleResponse | null>(null);
  loadingBattle = signal(false);

  ngOnInit() {
    this.loadOnGoingBattle();
    this.handlePaymentRedirect();
  }

  handlePaymentRedirect() {
    this.route.queryParams.subscribe((params) => {
      const payment = params['payment'];

      if (payment === 'success') {
        this.toast.success('Payment successful! Gold has been added.');

        this.userService.getProfile().subscribe();

        this.router.navigate([], {
          queryParams: {
            payment: null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });
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
