import { Component, input, output } from '@angular/core';
import { BattleResponse } from '../../../core/models/battle/battle-response';
import { BattleDetailModal } from '../battle-detail-modal/battle-detail-modal';

@Component({
  selector: 'app-battle-history-row',
  imports: [],
  templateUrl: './battle-history-row.html',
  styleUrl: './battle-history-row.scss',
})
export class BattleHistoryRow {
  battle = input.required<BattleResponse>();

  viewDetails = output<BattleResponse>();
  continueBattle = output<BattleResponse>();

  onViewDetails() {
    this.viewDetails.emit(this.battle());
  }

  onContinueBattle() {
    this.continueBattle.emit(this.battle());
  }
  healthPercent(current: number, max: number) {
    if (!max) return 0;
    return Math.max(0, Math.min(100, (current / max) * 100));
  }
}
