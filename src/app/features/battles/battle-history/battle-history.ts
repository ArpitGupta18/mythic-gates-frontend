import { Component, inject, OnInit, signal } from '@angular/core';
import { BattleService } from '../../../core/services/battle.service';
import { BattleResponse } from '../../../core/models/battle/battle-response';

import { BattleDetailModal } from '../battle-detail-modal/battle-detail-modal';
import { BattleHistoryRow } from '../battle-history-row/battle-history-row';

@Component({
  selector: 'app-battle-history',
  imports: [BattleHistoryRow, BattleDetailModal],
  templateUrl: './battle-history.html',
  styleUrl: './battle-history.scss',
})
export class BattleHistory implements OnInit {
  private battleService = inject(BattleService);

  battles = signal<BattleResponse[]>([]);

  page = signal<number>(0);
  size = signal<number>(8);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  last = signal<boolean>(false);

  selectedBattle = signal<BattleResponse | null>(null);

  ngOnInit() {
    this.loadBattles(0);
  }

  loadBattles(page: number) {
    return this.battleService.getMyBattles(page, this.size()).subscribe({
      next: (response) => {
        const data = response.data;

        this.battles.set(data?.content ?? []);
        this.page.set(data?.page ?? 0);
        this.size.set(data?.size ?? 0);
        this.totalPages.set(data?.totalPages ?? 0);
        this.totalElements.set(data?.totalElements ?? 0);
        this.last.set(data?.last ?? false);
      },
      error: (err) => console.error(err),
    });
  }

  openDetails(battle: BattleResponse) {
    this.selectedBattle.set(battle);
  }

  closeDetails() {
    this.selectedBattle.set(null);
  }

  nextPage() {
    if (!this.last()) {
      this.loadBattles(this.page() + 1);
    }
  }

  previousPage() {
    if (this.page() > 0) {
      this.loadBattles(this.page() - 1);
    }
  }

  continueBattle(battle: BattleResponse) {
    console.log(battle);
  }
}
